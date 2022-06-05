import { Search2Icon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, HStack, IconButton, Input, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';

export const IpInfo = ({ ipInfo, onSearchBtnClick }: any) => {
  const { full: ipFullInfo } = ipInfo;

  return (
    <>
      <TableContainer>
        <Table variant='striped'>
          <Tbody>
            <Tr>
              <Td>IP</Td>
              <Td>
                <HStack style={{ float: 'right' }}>
                  <Formik
                    initialValues={{ curIpDomain: ipFullInfo.ip }}
                    onSubmit={(values: any, actions: any) => {
                      onSearchBtnClick(values.curIpDomain);
                      // actions.setSubmitting(false);
                    }}
                  >
                    {() => (
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
                          <IconButton type='submit' size='sm' aria-label='Search' icon={<Search2Icon />} />
                        </HStack>
                      </Form>
                    )}
                  </Formik>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>ISP</Td>
              <Td isNumeric>{ipFullInfo.isp}<br />@{ipFullInfo.org}</Td>
            </Tr>
            <Tr>
              <Td>latlng</Td>
              <Td isNumeric>{ipFullInfo.latitude}, {ipFullInfo.longitude}</Td>
            </Tr>
            <Tr>
              <Td>Location</Td>
              <Td isNumeric>{ipFullInfo.city}, {ipFullInfo.region}, {ipFullInfo.country} ({ipFullInfo.country_code})</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
