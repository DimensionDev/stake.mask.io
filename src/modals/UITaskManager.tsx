import { ModalProps } from '@chakra-ui/react'
import { type ComponentType, createElement, Fragment, useEffect, useMemo, useState } from 'react'

import { EMPTY_LIST } from '@/constants/misc'
import { defer, DeferTuple } from '@/utils/defer'

export interface ContextOptions<Options, Result> {
  show(options?: Omit<Options, 'isOpen'>, signal?: AbortSignal): Promise<Result>
}

export interface BaseDialogProps<T> extends Partial<Pick<ModalProps, 'isOpen' | 'onClose'>> {
  onSubmit?(result: T | null): void
}

/**
 * Create a manager of UI task sessions,
 */
export const createUITaskManager = <TaskOptions extends BaseDialogProps<Result>, Result>(
  Component: ComponentType<TaskOptions>,
) => {
  let id = 0

  type TaskDeferTuple = DeferTuple<Result | null>
  interface Task {
    id: number
    isOpen: boolean
    promise: Promise<Result | null>
    resolve: TaskDeferTuple[1]
    reject: TaskDeferTuple[2]
    options?: Omit<TaskOptions, 'isOpen'>
  }

  const [injectedPromise, resolveInjected] = defer()
  type Controller = {
    show(options?: Omit<TaskOptions, 'isOpen' | 'children' | 'onClose'>, signal?: AbortSignal): Promise<Result | null>
  }

  const controller: Controller = {
    async show(options, signal) {
      await injectedPromise
      return controller.show(options, signal)
    },
  }
  function Tasks() {
    const [tasks, setTasks] = useState<Task[]>(EMPTY_LIST)

    const control = useMemo(() => {
      const removeTask = (id: number) => {
        setTasks((list) =>
          list.map((t) => {
            return t.id !== id ? t : { ...t, isOpen: false }
          }),
        )
        // TODO Dummy timeout await for closing completed
        setTimeout(() => {
          setTasks((list) => list.filter((t) => t.id !== id))
        }, 2000)
      }

      return {
        async show(options?: Omit<TaskOptions, 'isOpen'>, signal?: AbortSignal) {
          const [promise, resolve, reject] = defer<Result | null>()
          id += 1
          function abortHandler() {
            resolve(null)
          }
          signal?.addEventListener('abort', abortHandler, { once: true })
          const newTask: Task = {
            id,
            isOpen: true,
            promise,
            resolve,
            reject,
            options,
          }
          setTasks((list) => [...list, newTask])
          promise.then(() => {
            signal?.removeEventListener('abort', abortHandler)
            removeTask(newTask.id)
          })
          return promise
        },
      }
    }, [])

    useEffect(() => {
      Object.assign(controller, control)
      resolveInjected(true)
    }, [control])

    return (
      <Fragment>
        {tasks.map((task) => {
          return createElement(Component, {
            ...task.options,
            key: task.id,
            isOpen: task.isOpen,
            onClose: () => {
              task.resolve(null)
            },
          } as unknown as TaskOptions)
        })}
      </Fragment>
    )
  }
  const name = Component.displayName || Component.name
  Tasks.displayName = `${name}(Tasks)`

  return {
    controller,
    ui: <Tasks />,
  }
}
