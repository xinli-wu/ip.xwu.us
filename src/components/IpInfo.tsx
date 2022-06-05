import { CopyIcon, Search2Icon } from '@chakra-ui/icons';
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
                          <IconButton colorScheme='green' type='submit' size='sm' aria-label='Search' icon={<Search2Icon />} />
                        </HStack>
                      </Form>
                    )}
                  </Formik>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>ISP</Td>
              <Td isNumeric>
                <HStack style={{ float: 'right' }}>
                  <div>{ipFullInfo.isp}<br />@{ipFullInfo.org}</div>
                  <IconButton colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>latlng</Td>
              <Td isNumeric>
                <HStack style={{ float: 'right' }}>
                  <div>{ipFullInfo.latitude}, {ipFullInfo.longitude}</div>
                  <IconButton colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>Location</Td>
              <Td isNumeric>
                <HStack style={{ float: 'right' }}>
                  <div>{ipFullInfo.city}, {ipFullInfo.region}, {ipFullInfo.country} ({ipFullInfo.country_code})</div>
                  <IconButton colorScheme='blue' size='sm' aria-label='Copy' icon={<CopyIcon />} />
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
