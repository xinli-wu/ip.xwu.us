import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { IpInfo } from '../components/IpInfo';
import { getIpInfo } from '../utils/getIpInfo';
import './Map.css';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


export const Map = () => {
  const [ipInfo, setIpInfo] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const ipDomain = location.pathname.replace('/', '');
      const ipInfo = await getIpInfo(ipDomain);
      setIpInfo(ipInfo);
    })();
  }, [location.pathname]);

  const onSearchBtnClick = (curIpDomain: any) => {
    console.log('onSearchBtnClick', curIpDomain);
    navigate(`../${curIpDomain}`, { replace: false });
  };

  return (
    <>
      {ipInfo && ipInfo.ip &&
        <MapContainer center={[ipInfo.full.latitude, ipInfo.full.longitude]} zoom={13} doubleClickZoom={false} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[ipInfo.full.latitude, ipInfo.full.longitude]}>
            <Tooltip direction="bottom" offset={[0, 45]} opacity={1} permanent interactive>
              <IpInfo ipInfo={ipInfo} onSearchBtnClick={onSearchBtnClick} style={{ maxWidth: '100vw' }} />
            </Tooltip>
          </Marker>
        </MapContainer>
      }
    </>
  );
};
