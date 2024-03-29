import { CopyIcon, Search2Icon, WarningIcon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, HStack, IconButton, Input, InputGroup, InputLeftElement, Spinner, Table, TableContainer, Tbody, Td, Text, Tooltip, Tr, useToast } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { getIpInfo } from '../utils/getIpInfo';

export const IpInfo = ({ ipInfo, setIpInfo }: any) => {
  const { full: fullIpInfo } = ipInfo.data;
  const ISP = `${fullIpInfo.isp} @ ${fullIpInfo.org}`;
  const Latlng = `${fullIpInfo.latitude}, ${fullIpInfo.longitude}`;
  const Location = `${fullIpInfo.city}, ${fullIpInfo.region}, ${fullIpInfo.country} (${fullIpInfo.country_code})`;
  const inputElement = useRef<HTMLHeadingElement>(null);
  const toast = useToast();
  const [error, setError] = useState<any>({ status: false });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputElement.current && isBrowser) {
      inputElement.current.focus();
    }
  });

  const onCopyISPBtnClicked = () => {
    navigator.clipboard.writeText(ISP);
    toast({
      title: 'ISP copied 👐',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });

  };

  const onCopyLatlngBtnClicked = () => {
    navigator.clipboard.writeText(Latlng);
    toast({
      title: 'LatLng copied 👍',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  };

  const onCopyLocationBtnClicked = () => {
    navigator.clipboard.writeText(Location);
    toast({
      title: 'Location copied 👍',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  };

  const onSearchBtnClick = async (newIpDomain: string) => {
    setLoading(true);
    const { data, status } = await getIpInfo(newIpDomain).catch(e => ({ data: e.response.data, status: e.response.status }));
    setLoading(false);

    if (status === 404) { setError({ status: true, message: data.message }); return; }

    setIpInfo({ data, loading: false });
    setError({ status: false });
    window.history.replaceState(null, `/${newIpDomain}`, `/${newIpDomain}`);
  };

  return (
    <TableContainer>
      <Table variant='striped'>
        <Tbody>
          <Tr>
            <Td>IP {'domain' in ipInfo.data && `(${ipInfo.data.domain})`}
            </Td>
            <Td>
              <HStack style={{ float: 'right', width: '100%' }}>
                <Formik
                  initialValues={{ curIpDomain: fullIpInfo.ip }}
                  enableReinitialize
                  onSubmit={(values: any, actions: any) => {
                    onSearchBtnClick(values.curIpDomain);
                    // actions.setSubmitting(false);
                  }}
                >
                  <Form style={{ width: '100%' }}>
                    <HStack style={{ float: 'right', width: '100%' }}>
                      <Field name='curIpDomain' width={'100%'}>
                        {({ field, form }: any) => (
                          <FormControl isInvalid={form.errors.curIpDomain && form.touched.curIpDomain} width={'100%'}>
                            <InputGroup size='sm' width={'100%'}>
                              {error.status &&
                                <InputLeftElement
                                  // pointerEvents='none'
                                  children={
                                    <Tooltip label={error.message} defaultIsOpen hasArrow closeOnClick closeOnEsc variant={'solid'}>
                                      <WarningIcon color='red' />
                                    </Tooltip>
                                  }
                                />
                              }
                              <Input {...field} isInvalid={error.status} ref={inputElement} id='curIpDomain' size='sm' placeholder='Search IP or Domain' style={{ textAlign: 'right' }} />
                            </InputGroup>
                            <FormErrorMessage>{form.errors.curIpDomain}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <IconButton isRound variant='ghost' colorScheme='green' type='submit' size='sm' aria-label='Search' icon={loading ? <Spinner size='sm' /> : <Search2Icon />} />
                    </HStack>
                  </Form>
                </Formik>
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>ISP</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right', filter: error.status && 'blur(0.15rem)' }}>
                <Text>{fullIpInfo.isp}<br />@{fullIpInfo.org}</Text>
                <IconButton disabled={error.status} isRound variant='ghost' colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyISPBtnClicked} />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>LatLng</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right', filter: error.status && 'blur(0.15rem)' }}>
                <Text>{Latlng}</Text>
                <IconButton disabled={error.status} isRound variant='ghost' colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyLatlngBtnClicked} />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right', filter: error.status && 'blur(0.15rem)' }}>
                <Text>{Location}</Text>
                <IconButton disabled={error.status} isRound variant='ghost' colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyLocationBtnClicked} />
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
