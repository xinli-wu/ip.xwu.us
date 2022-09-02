import { CopyIcon, Search2Icon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, HStack, IconButton, Input, InputGroup, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const IpInfo = ({ ipInfo, onSearchBtnClick }: any) => {
  const { full: fullIpInfo } = ipInfo;
  const ISP = `${fullIpInfo.isp} @ ${fullIpInfo.org}`;
  const Latlng = `${fullIpInfo.latitude}, ${fullIpInfo.longitude}`;
  const Location = `${fullIpInfo.city}, ${fullIpInfo.region}, ${fullIpInfo.country} (${fullIpInfo.country_code})`;
  const inputElement = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  });

  const onCopyISPBtnClicked = () => {
    navigator.clipboard.writeText(ISP);
    toast.success("ISP coppied");
  };

  const onCopyLatlngBtnClicked = () => {
    navigator.clipboard.writeText(Latlng);
    toast.success("Latlng coppied");
  };

  const onCopyLocationBtnClicked = () => {
    navigator.clipboard.writeText(Location);
    toast.success("Location coppied");
  };

  return (
    <TableContainer>
      <Table variant='striped'>
        <Tbody>
          <Tr>
            <Td>IP {fullIpInfo['domain'] ? `(${fullIpInfo.domain})` : ''}</Td>
            <Td>
              <HStack style={{ float: 'right' }}>
                <Formik
                  initialValues={{ curIpDomain: fullIpInfo.ip }}
                  enableReinitialize
                  onSubmit={(values: any, actions: any) => {
                    onSearchBtnClick(values.curIpDomain);
                    // actions.setSubmitting(false);
                  }}
                >
                  <Form>
                    <HStack style={{ float: 'right' }}>
                      <Field name='curIpDomain' >
                        {({ field, form }: any) => (
                          <FormControl isInvalid={form.errors.curIpDomain && form.touched.curIpDomain}>
                            <InputGroup size='sm'>
                              <Input {...field} ref={inputElement} id='curIpDomain' size='sm' placeholder='Search IP or Domain' style={{ textAlign: 'right' }} />
                            </InputGroup>
                            <FormErrorMessage>{form.errors.curIpDomain}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <IconButton isRound variant='ghost' colorScheme='green' type='submit' size='sm' aria-label='Search' icon={<Search2Icon />} />
                    </HStack>
                  </Form>
                </Formik>
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>ISP</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right' }}>
                <Text>{fullIpInfo.isp}<br />@{fullIpInfo.org}</Text>
                <IconButton variant='ghost' colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyISPBtnClicked} />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>latlng</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right' }}>
                <Text>{Latlng}</Text>
                <IconButton variant='ghost' colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyLatlngBtnClicked} />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right' }}>
                <Text>{Location}</Text>
                <IconButton variant='ghost' colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyLocationBtnClicked} />
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
