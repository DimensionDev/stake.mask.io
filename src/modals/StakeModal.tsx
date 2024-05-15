import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  List,
  ListItem,
  ModalProps,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Trans, t } from '@lingui/macro'
import { useAccount } from 'wagmi'
import { StepIcon } from '../components/StepIcon'
import { TokenIcon } from '../components/TokenIcon'
import { BaseModal } from './BaseModal'

interface Props extends ModalProps {}

export function StakeModal(props: Props) {
  const account = useAccount()
  return (
    <BaseModal title={t`Stake`} width={572} height={521} {...props}>
      <Box
        as="form"
        display="flex"
        flexDir="column"
        className="stake-form"
        flexGrow={1}
      >
        <List spacing={6}>
          <ListItem display="flex">
            <StepIcon
              width={6}
              height={6}
              step={1}
              completed={account.isConnected}
            />
            <Text
              as="span"
              ml={3}
              fontSize={14}
              fontWeight="bold"
              color="neutrals.1"
            >{t`Connect Wallet`}</Text>
            {account.isConnected ? null : (
              <Button
                bg="gradient.purple"
                size="sm"
                ml="auto"
                fontSize={14}
                color="neutrals.8"
                _hover={{ bg: 'gradient.purple' }}
                rounded={24}
              >{t`Connect Wallet`}</Button>
            )}
          </ListItem>
          <ListItem display="flex">
            <StepIcon width={6} height={6} step={2} />
            <Text
              as="span"
              ml={3}
              fontSize={14}
              fontWeight="bold"
              color="neutrals.1"
              minW="130px"
            >{t`Link 𝕏`}</Text>
            <Button
              bg="gradient.purple"
              ml="auto"
              size="sm"
              color="neutrals.8"
              minW="130px"
              rounded={24}
              _hover={{ bg: 'gradient.purple' }}
            >
              𝕏
            </Button>
          </ListItem>
        </List>
        <Box
          className="input-box"
          border="1px solid"
          borderColor="neutrals.6"
          rounded={12}
          p={4}
          _focusWithin={{
            borderColor: 'neutrals.3',
          }}
        >
          <InputGroup>
            <InputLeftAddon flexShrink={0} p={0} bg="transparent">
              <TokenIcon flexShrink={0} />
              <Stack ml={4}>
                <Text fontSize={20} lineHeight="20px">
                  Mask
                </Text>
                <Text fontSize={16} lineHeight="16px">
                  Ethereum
                </Text>
              </Stack>
            </InputLeftAddon>
            <Input
              size="lg"
              placeholder={t`Stake Amount`}
              border="none"
              outline="none"
              _focus={{ outline: 'none', border: 'none' }}
              _focusVisible={{ border: 'none', boxShadow: 'none' }}
            />
            <InputRightAddon p={0} bg="transparent">
              <VStack alignItems="flex-end">
                <Text fontSize={16} color="neutrals.4">
                  Balance: --
                </Text>
                <Button size="xs">{t`Max`}</Button>
              </VStack>
            </InputRightAddon>
          </InputGroup>
        </Box>
        <HStack>
          <Text>{t`Unlock MASK Time`}</Text>
          <Text>12:00 1/23/2024</Text>
        </HStack>
        <HStack>
          <Text>{t`APR`}</Text>
          <Text>3.84%</Text>
        </HStack>
        <HStack>
          <Text>{t`Share of Pool`}</Text>
          <Text>30.99%</Text>
        </HStack>
        <HStack>
          <Text>{t`Pool Liquidity`}</Text>
          <HStack>
            <TokenIcon width={4} height={4} omitChain />
            <Text>200,000.00</Text>
          </HStack>
        </HStack>
        <Text color="danger">
          <Trans>
            The staking addresses need to pass Go+ security check. Note that
            staking is not available in some restricted regions.
            <Link id="more" href="/">
              More
            </Link>
          </Trans>
        </Text>
        <Button
          w="100%"
          bg="gradient.purple"
          rounded={50}
          mt="auto"
        >{t`Please connect first`}</Button>
      </Box>
    </BaseModal>
  )
}
