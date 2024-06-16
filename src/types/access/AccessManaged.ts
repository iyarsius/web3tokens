import { Log } from "viem";

export interface IAccessManagedEvents {AuthorityUpdated: (data: (Log & { args: IAccessManagedAuthorityUpdatedEventParams})) => void;
};
export interface IAccessManagedAuthorityUpdatedEventParams {
   authority: string
}

export interface IAccessManagedSetAuthorityParams {
  newAuthority: string
 }

