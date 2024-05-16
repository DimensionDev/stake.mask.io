import { ModalProps } from '@chakra-ui/react'
import { Fragment, createElement, useEffect, useMemo, useState, type ComponentType } from 'react'
import { EMPTY_LIST } from '../constants/misc'
import { DeferTuple, defer } from '../utils/defer'

export interface ContextOptions<Options, Result> {
  show(options?: Omit<Options, 'isOpen'>, signal?: AbortSignal): Promise<Result>
}

export interface BaseDialogProps<T> extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  onSubmit?(result: T | null): void
}

/**
 * Create a manager of small UI task sessions,
 * which provides both a Context and a Provider.
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

  type Controller = {
    show(options?: Omit<TaskOptions, 'isOpen'>, signal?: AbortSignal): Promise<Result | null>
  }

  const controller: Controller = {
    show() {
      throw new Error('Task UI not injected yet.')
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
        show(options?: Omit<TaskOptions, 'isOpen'>, signal?: AbortSignal) {
          const [promise, resolve, reject] = defer<Result | null>()
          id += 1
          signal?.addEventListener('abort', function abortHandler() {
            resolve(null)
            signal.removeEventListener('abort', abortHandler)
          })
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
            removeTask(newTask.id)
          })
          return promise
        },
      }
    }, [])

    useEffect(() => {
      Object.assign(controller, control)
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

  return {
    controller,
    ui: <Tasks />,
  }
}
