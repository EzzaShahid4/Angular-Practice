export interface masterTableModel {
  id: number;
  type: string;
}
export interface MatterModel {
  name: string;
}
export interface mattersModel {
  matterId: string;
  clientRef: string;
  propertyAddress: string;
}
export interface MatterModel {
  name: string;
  textColor: string;
  itemNumber?: number; // Optional, if you want to include item number
}
// export class mattersModel {
//   matterId: string;
//   clientRef: string;
//   propertyAddress: string;
// }
export interface matterModel {
  matterId: string;
  clientRef: string;
  nTitleRef: string;
  propertyAdress: string;
  matterInstructionTypeId: number;
  matterInstructionType: string;
  searches: boolean;
  managementPack: boolean;
  unregistered: boolean;
  matterStatusId: number;
  matterStatus: string;
  tenureId: number;
  tenureType: string;
  timeRemaining: any;
  isLate: boolean;
  slaHours: any;
  deadLine: any;
  clientFirmName: string;
  isSelected: boolean; // Optional property to track selection
}
export interface masterModal {
  id: any;
  type: string;
}
