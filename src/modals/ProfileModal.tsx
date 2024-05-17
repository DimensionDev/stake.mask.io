import { Button, Flex, FormControl, FormLabel, Input, ModalProps, Switch, useToast } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useId, useState } from 'react'
import { GradientButton } from '../components/GradientButton'
import { TwitterAvatar } from '../components/TwitterAvatar'
import { useUpdateUserInfo } from '../hooks/useUpdateUserInfo'
import { useUserInfo } from '../hooks/useUserInfo'
import { BaseModal } from './BaseModal'

export function ProfileModal(props: ModalProps) {
  const { data: userInfo } = useUserInfo()
  const switchId = useId()
  const [username = userInfo?.twitter_display_name, setUsername] = useState<string>()
  const [showAvatar = userInfo?.twitter_show_image, setShowAvatar] = useState<boolean>()
  const updateUserInfo = useUpdateUserInfo()
  const toast = useToast()
  return (
    <BaseModal title={t`Profile`} width={450} height={468} {...props}>
      <FormControl>
        <FormLabel mb={3}>{t`Profile Name`}</FormLabel>
        <Input
          size="lg"
          color="neutrals.4"
          rounded={12}
          fontSize={14}
          fontFamily="input"
          fontWeight={700}
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value)
          }}
        />
      </FormControl>
      <FormControl mt={6}>
        <FormLabel mb={3}>{t`Avatar`}</FormLabel>
        <TwitterAvatar size={90} src={userInfo?.twitter_image} omitBadge />
      </FormControl>
      <FormControl mt={6} display="flex" flexDir="row" alignItems="center">
        <Switch
          size="lg"
          isChecked={showAvatar}
          id={switchId}
          onChange={(e) => {
            setShowAvatar(e.currentTarget.checked)
          }}
        />
        <FormLabel htmlFor={switchId} mb={0} ml={3} fontSize={12} color="neutrals.1">{t`Show Avatar`}</FormLabel>
      </FormControl>
      <Flex justifyContent="space-between" gap={3} mt={6}>
        <Button rounded={24} flexGrow={1}>{t`Cancel`}</Button>
        <GradientButton
          flexGrow={1}
          disabled={!username}
          onClick={async () => {
            if (!username) {
              toast({
                status: 'error',
                title: t`Profile Name is required`,
              })
              return
            }
            const res = await updateUserInfo.mutateAsync({
              display_username: username,
              show_avatar: !!showAvatar,
            })
            if (res?.code !== 0 && res?.reason) {
              toast({
                status: 'error',
                title: res.reason,
              })
              return
            }
            props.onClose()
          }}
        >{t`Confirm`}</GradientButton>
      </Flex>
    </BaseModal>
  )
}
