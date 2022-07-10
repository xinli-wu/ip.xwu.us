import { CopyIcon, Search2Icon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, HStack, IconButton, Input, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const IpInfo = ({ ipInfo, onSearchBtnClick }: any) => {
  const { full: FullIpInfo } = ipInfo;

  const onCopyISPBtnClicked = () => {
    navigator.clipboard.writeText(`${FullIpInfo.isp} @ ${FullIpInfo.org}`);
    toast.success("ISP coppied");
  };

  const onCopyLatlngBtnClicked = () => {
    navigator.clipboard.writeText(`${FullIpInfo.latitude}, ${FullIpInfo.longitude}`);
    toast.success("Latlng coppied");
  };

  const onCopyLocationBtnClicked = () => {
    navigator.clipboard.writeText(`${FullIpInfo.city}, ${FullIpInfo.region}, ${FullIpInfo.country} (${FullIpInfo.country_code}`);
    toast.success("Location coppied");
  };

  return (
    <TableContainer>
      <Table variant='striped'>
        <Tbody>
          <Tr>
            <Td>IP</Td>
            <Td>
              <HStack style={{ float: 'right' }}>
                <Formik
                  initialValues={{ curIpDomain: FullIpInfo.ip }}
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
                            <Input {...field} id='curIpDomain' size='sm' placeholder='curIpDomain' style={{ textAlign: 'right' }} />
                            <FormErrorMessage>{form.errors.curIpDomain}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <IconButton colorScheme='green' type='submit' size='sm' aria-label='Search' icon={<Search2Icon />} />
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
                <div>{FullIpInfo.isp}<br />@{FullIpInfo.org}</div>
                <IconButton colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyISPBtnClicked} />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>latlng</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right' }}>
                <div>{FullIpInfo.latitude}, {FullIpInfo.longitude}</div>
                <IconButton colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyLatlngBtnClicked} />
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td isNumeric>
              <HStack style={{ float: 'right' }}>
                <div>{FullIpInfo.city}, {FullIpInfo.region}, {FullIpInfo.country} ({FullIpInfo.country_code})</div>
                <IconButton colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} onClick={onCopyLocationBtnClicked} />
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
