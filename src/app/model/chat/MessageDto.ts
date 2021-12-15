export class MessageDto {
  public user: string = '';
  public msgText: string = '';
}

export class ChatConversation {
  id:number = 0;
  chatCoversationId:number = 0;
  userId:number = 0;
  chatDocumentId:number = 0;
  comment:string = '';
  dateComment:Date = null;
  status:boolean = true;
  chatDocumentImmigrationRelocations:ChatDocument[] = [];
}

export class ChatDocument {
  id:number = 0;
  filePath:string = '';
  fileExtension:string = '';
  chatImmigrationRelocationId:number = 0;
  status:boolean = true;
}

export class newChat {
  id:number = 0;
  serviceLineId:number = 0;
  status:boolean = true;
  createdBy:number = 0;
  createdDate:Date = null;
  serviceRecordId:number = 0;
  chatImmigrationRelocations:ChatConversation[] = [new ChatConversation()];
}
