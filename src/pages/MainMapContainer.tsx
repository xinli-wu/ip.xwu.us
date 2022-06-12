import L, { LatLng } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { IpInfo } from '../components/IpInfo';
import { getIpInfo } from '../utils/getIpInfo';
import './MainMapContainer.css';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


export const Map = ({ ipInfo }: any) => {
  const navigate = useNavigate();
  const map = useMap();
  const latlng = new LatLng(ipInfo.full.latitude, ipInfo.full.longitude);

  const onSearchBtnClick = (curIpDomain: any) => {
    navigate(`../${curIpDomain}`, { replace: false });
  };


  useEffect(() => {
    map.flyTo(latlng, 13, { duration: 0.75 });
  });


  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latlng}>
        <Tooltip direction="bottom" offset={[0, 45]} opacity={1} permanent interactive>
          <IpInfo ipInfo={ipInfo} onSearchBtnClick={onSearchBtnClick} style={{ maxWidth: '100vw' }} />
        </Tooltip>
      </Marker>
    </>
  );
};


export const MainMapContainer = () => {
  const [ipInfo, setIpInfo] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const ipDomain = location.pathname.replace('/', '');
      const ipInfo = await getIpInfo(ipDomain);
      setIpInfo(ipInfo);
    })();
  }, [location.pathname]);

  return (
    <>
      {ipInfo && ipInfo.ip &&
        <MapContainer
          center={[ipInfo.full.latitude, ipInfo.full.longitude]}
          zoom={13}
          doubleClickZoom={false}
          scrollWheelZoom={false}
        >
          <Map ipInfo={ipInfo} />
        </MapContainer>
      }
    </>
  );
};
