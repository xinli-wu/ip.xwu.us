import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import L, { LatLng, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { SvgIconTpl } from '../assets/icons/Icons';
import { IpInfo } from '../components/IpInfo';
import { getIpInfo } from '../utils/getIpInfo';
import './MainMapContainer.css';

const DEFAULT_ZOOM = 10;

const DefaultIcon = L.divIcon({
  className: "",
  html: SvgIconTpl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const Map = ({ ipInfo }: any) => {
  const navigate = useNavigate();
  const map = useMap();

  const latlng = new LatLng(ipInfo.full.latitude, ipInfo.full.longitude);
  const onSearchBtnClick = (curIpDomain: string) => {
    navigate(`/${curIpDomain}`, { replace: false });
  };


  useEffect(() => {
    map.flyTo(latlng, DEFAULT_ZOOM, { duration: 0.75 });
  });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latlng}>
        <Tooltip direction="bottom" offset={[0, 5]} opacity={1} permanent interactive>
          <IpInfo maxWidth={300} maxHeight={600} ipInfo={ipInfo} onSearchBtnClick={onSearchBtnClick} style={{ maxWidth: '80vw' }} />
        </Tooltip>
      </Marker>
    </>
  );
};

export const MainMapContainer = () => {
  const [ipInfo, setIpInfo] = useState<any>(null);
  const { ipDomain } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();

  const center: LatLngExpression = [ipInfo?.full?.latitude, ipInfo?.full?.longitude];

  useEffect(() => {
    (async () => {
      const ipInfo = await getIpInfo(ipDomain);
      setIpInfo(ipInfo);
    })();
  }, [ipDomain]);

  return (
    <>
      {ipInfo?.ip &&
        <MapContainer
          center={center}
          zoom={DEFAULT_ZOOM}
          doubleClickZoom={false}
          scrollWheelZoom={true}
        >
          <Map ipInfo={ipInfo} />
          <div className='leaflet-top leaflet-right'>
            <div className="leaflet-control leaflet-bar">
              <IconButton
                onClick={toggleColorMode}
                isRound
                aria-label='Switch Mode'
                icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
              />
            </div>
          </div>
        </MapContainer>
      }
    </>
  );
};
