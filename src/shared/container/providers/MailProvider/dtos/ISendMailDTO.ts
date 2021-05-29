import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface ISendMailDTO {
  to: string;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
