// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      'body': {},
      '.leaflet-tile': {
        ...(props.colorMode === 'dark' && { filter: 'var(--leaflet-tile-filter, none)' })
      },
      '.leaflet-tooltip': {
        color: 'unset',
        background: 'var(--chakra-colors-chakra-body-bg)',
        border: '1px solid var(--chakra-colors-chakra-body-bg)'
      },
      'tr:nth-of-type(2n) td': {
        background: 'var(--chakra-colors-chakra-body-bg)'
      },
      '.leaflet-bar a': {
        background: 'var(--chakra-colors-chakra-body-bg)',
        color: 'unset',
        _hover: {
          background: mode('var(--chakra-colors-gray-100)', 'var(--chakra-colors-gray-700)')(props)
        }
      },
      // '.chakra-alert!': {
      //   background: mode('var(--chakra-colors-green-500)', 'var(--chakra-colors-green-200)')(props),
      //   color: mode('var(--chakra-colors-white)', 'var(--chakra-colors-gray-900)')(props),
      // },
      '.leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar': {
        border: '2px solid rgba(0,0,0,0)'
      },
      '.chakra-stack.chakra-stack': {
        whiteSpace: 'break-spaces'
      }
    }),
  },
});

export default theme;