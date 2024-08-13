//@ts-nocheck

import React from 'react';
import { AcUnit, Business, ChangeCircle, ChildCare, ContentCut, Deck, DirectionsBike, ElderlyWoman, Elevator, Help, House, Kitchen, Language, LocalCafe, LocalGasStation, LocalGroceryStore, LocalLibrary, LocalParking, LocalPharmacy, MeetingRoom, Pets, Pool, Restaurant, Security, Spa, SportsGymnastics, SportsHandball, Videocam, WaterDrop,Wifi ,Commit,FireHydrantAlt,YardRounded} from '@mui/icons-material'

// import { Wifi } from 'lucide-react';

const iconMap = {
    AcUnit: AcUnit,
    Business: Business,
    ChangeCircle: ChangeCircle,
    ChildCare: ChildCare,
    ContentCut: ContentCut,
    Deck: Deck,
    DirectionsBike: DirectionsBike,
    ElderlyWoman: ElderlyWoman,
    Elevator: Elevator,
    Help: Help,
    House: House,
    Kitchen: Kitchen,
    Language: Language,
    LocalCafe: LocalCafe,
    Commit:Commit,
    LocalGroceryStore: LocalGroceryStore,
    LocalLibrary: LocalLibrary,
    LocalParking: LocalParking,
    LocalPharmacy: LocalPharmacy,
    MeetingRoom: MeetingRoom,
    Pets: Pets,
    Pool: Pool,
    Restaurant: Restaurant,
    Security: Security,
    Spa: Spa,
    SportsGymnastics: SportsGymnastics,
    SportsHandball: SportsHandball,
    Videocam: Videocam,
    WaterDrop: WaterDrop,
    Wifi:Wifi,
    FireHydrantAlt:FireHydrantAlt,
    YardRounded:YardRounded,
  };

export const IconRenderer = ({ iconName,className}) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={`${className}`} sx={{fontSize:30}}/> : null;
};