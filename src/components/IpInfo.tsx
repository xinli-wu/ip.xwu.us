import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';

export const IpInfo = ({ ipInfo }: any) => {
  const ipFullInfo = ipInfo.full;
  return (
    <>
      <TableContainer>
        <Table variant='striped'>
          <Tbody>
            <Tr>
              <Td>IP</Td>
              <Td isNumeric><strong>{ipFullInfo.ip}</strong></Td>
            </Tr>
            <Tr>
              <Td>ISP</Td>
              <Td isNumeric>{ipFullInfo.isp} @{ipFullInfo.org}</Td>
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
