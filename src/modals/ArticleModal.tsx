import { Box, ModalProps } from '@chakra-ui/react'
import Markdown from 'markdown-to-jsx'

import { BaseModal, BaseModalProps } from '@/modals/BaseModal'
import { createUITaskManager } from '@/modals/UITaskManager'
import { markdownBaseStyle } from '@/styles/markdown-base-style.svg.ts'

interface Props extends ModalProps {
  title?: BaseModalProps['title']
  /** markdown content */
  content: string
}
export function ArticleModal({ title, content, ...props }: Props) {
  return (
    <BaseModal title={title} width={572} {...props}>
      <Box
        color="neutrals.2"
        fontSize="12px"
        maxH={600}
        overflow="auto"
        style={{ scrollbarWidth: 'none' }}
        fontWeight={700}
        lineHeight="20px"
        sx={markdownBaseStyle}
      >
        <Markdown>{content}</Markdown>
      </Box>
    </BaseModal>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const { ui: articleUi, controller: articleModal } = createUITaskManager(ArticleModal)
