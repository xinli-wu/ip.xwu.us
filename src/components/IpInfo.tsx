import { CopyIcon, Search2Icon, WarningIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { getIpInfo } from '../utils/getIpInfo';

type LocationData = {
  ISP: string;
  LatLng: string;
  Location: string;
};
export const IpInfo = ({ ipInfo, setIpInfo }: any) => {
  const { full: fullIpInfo } = ipInfo.data;
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [error, setError] = useState<any>({ status: false });
  const [loading, setLoading] = useState<boolean>(false);

  const data: LocationData = {
    ISP: `${fullIpInfo.isp} @ ${fullIpInfo.org}`,
    LatLng: `${fullIpInfo.latitude}, ${fullIpInfo.longitude}`,
    Location: `${fullIpInfo.city}, ${fullIpInfo.region}, ${fullIpInfo.country} (${fullIpInfo.country_code})`,
  };

  useEffect(() => {
    if (inputRef.current && isBrowser) {
      inputRef.current.focus();
    }
  });

  const onCopyBtnClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(
      data[e.currentTarget.value as keyof LocationData]
    );
    toast({
      title: `${e.currentTarget.value} copied 👍`,
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  };

  const onSearchBtnClick = async (newIpDomain: string) => {
    setLoading(true);
    const { data, status } = await getIpInfo(newIpDomain).catch((e) => ({
      data: e.response.data,
      status: e.response.status,
    }));
    setLoading(false);

    if (status === 404) {
      setError({ status: true, message: data.message });
      return;
    }

    setIpInfo({ data, loading: false });
    setError({ status: false });
    window.history.replaceState(null, `/${newIpDomain}`, `/${newIpDomain}`);
  };

  return (
    <TableContainer>
      <Table variant='striped'>
        <Tbody>
          <Tr>
            <Td>IP {'domain' in ipInfo.data && `(${ipInfo.data.domain})`}</Td>
            <Td>
              <HStack style={{ float: 'right', width: '100%' }}>
                <Formik
                  initialValues={{ curIpDomain: fullIpInfo.ip }}
                  enableReinitialize
                  onSubmit={(values: any, actions: any) => {
                    onSearchBtnClick(values.curIpDomain);
                  }}
                >
                  <Form style={{ width: '100%' }}>
                    <HStack style={{ float: 'right', width: '100%' }}>
                      <Field name='curIpDomain' width={'100%'}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.curIpDomain &&
                              form.touched.curIpDomain
                            }
                            width={'100%'}
                          >
                            <InputGroup size='sm' width={'100%'}>
                              {error.status && (
                                <InputLeftElement>
                                  <Tooltip
                                    label={error.message}
                                    defaultIsOpen
                                    hasArrow
                                    closeOnClick
                                    closeOnEsc
                                    variant={'solid'}
                                  >
                                    <WarningIcon color='red' />
                                  </Tooltip>
                                </InputLeftElement>
                              )}
                              <Input
                                {...field}
                                isInvalid={error.status}
                                ref={inputRef}
                                id='curIpDomain'
                                size='sm'
                                placeholder='Search IP or Domain'
                                style={{ textAlign: 'right' }}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.curIpDomain}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <IconButton
                        isRound
                        variant='ghost'
                        colorScheme='green'
                        type='submit'
                        size='sm'
                        aria-label='Search'
                        icon={loading ? <Spinner size='sm' /> : <Search2Icon />}
                      />
                    </HStack>
                  </Form>
                </Formik>
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>ISP</Td>
            <Td isNumeric>
              <HStack
                style={{
                  float: 'right',
                  filter: error.status && 'blur(0.15rem)',
                }}
              >
                <Text>
                  {fullIpInfo.isp}
                  <br />@{fullIpInfo.org}
                </Text>
                <IconButton
                  disabled={error.status}
                  isRound
                  variant='ghost'
                  colorScheme='blue'
                  size='sm'
                  aria-label='Copy'
                  icon={<CopyIcon />}
                  value='ISP'
                  onClick={onCopyBtnClick}
                />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>LatLng</Td>
            <Td isNumeric>
              <HStack
                style={{
                  float: 'right',
                  filter: error.status && 'blur(0.15rem)',
                }}
              >
                <Text>{data.LatLng}</Text>
                <IconButton
                  disabled={error.status}
                  isRound
                  variant='ghost'
                  colorScheme='blue'
                  size='sm'
                  aria-label='Copy'
                  icon={<CopyIcon />}
                  value='LatLng'
                  onClick={onCopyBtnClick}
                />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td isNumeric>
              <HStack
                style={{
                  float: 'right',
                  filter: error.status && 'blur(0.15rem)',
                }}
              >
                <Text>{data.Location}</Text>
                <IconButton
                  disabled={error.status}
                  isRound
                  variant='ghost'
                  colorScheme='blue'
                  size='sm'
                  aria-label='Copy'
                  icon={<CopyIcon />}
                  value='Location'
                  onClick={onCopyBtnClick}
                />
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
