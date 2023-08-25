export interface Officy {
  id?: number,
  office?: string,
  image?: string,
  imageExtension?: string,
  country?: number,
  city?: number,
  address?: string,
  zip?: string,
  phone?: string,
  email?: string,
  operationsEmail?: string,
  financeEmail?: string,
  other?: string,
  currency?: number,
  legalEntity?: string,
  taxId?: string,
  createdBy?: number,
  createdDate?: Date,
  updatedBy?: number,
  updatedDate?: Date,
  documentOffices?: [
    {
      id?: number,
      idCatOffice?: number,
      image?: any,
      documentName?: string,
      imageExtension?: string,
      filePath?: string,
      idPrivacy?: number,
      date?: Date,
      status?: number
    }
  ],
  officeBankingDetailLists?:[
    {
       id?:number,
       idCatOffice?:number,
       accountType?:number,
       accountHoldersName?:string,
       bankName?:string,
       accountNumber?:number,
       clabe?:string,
       routingNumber?:string,
       swiftBicCode?:string,
       iban?:string,
       currency?:number,
       wireFeeApprox?:number,
       bankAddress?:string,
       internationalPaymentAcceptance?:boolean,
       comments?:string,
       createdBy?:number,
       createdDate?:Date,
       updatedBy?:number,
       updatedDate?:Date,
       relBankingDetailTypeOfficeBankingDetails?: [
        {
          id?: number,
          idCatBankingDetailType: number,
          idOfficeBankingDetailList: number
        }
      ]
    }
  ]
}
export interface officeBankingDetail {
  officeBankingDetailLists:[
    {
       id:number,
       idCatOffice:number,
       accountType:number,
       accountHoldersName:string,
       bankName:string,
       accountNumber:number,
       clabe:string,
       routingNumber:string,
       swiftBicCode:string,
       iban:string,
       currency:number,
       wireFeeApprox:number,
       bankAddress:string,
       internationalPaymentAcceptance:boolean,
       comments:string,
       createdBy:number,
       createdDate:Date,
       updatedBy:number,
       updatedDate:Date,
    }
 ]
}
