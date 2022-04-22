export enum ErrorCode {
  GENERIC_ERROR = 1000,
  NOT_FOUND_WATCHLIST_ERROR = 4000,
  UNAUTHORIZED_ERROR = 4001,
  NOT_FOUND_COMPANY_ERROR = 4002,
  NOT_FOUND_USER_ERROR = 4003,
  NOT_FOUND_BENEFICIARY_ERROR = 4004,
  INVALID_EMAIL_ERROR = 4005,
  EXISTING_EMAIL_ERROR = 4006,
  INVALID_CEP_FORMAT = 4007,
  BAD_REQUEST = 4008,
  NOT_FOUND_EMPLOYEE_PROFILE = 4009,
  HOLDER_INVALID = 4010,
  MISSING_UNION_DATE = 4011,
  BENEFICIARY_WITH_WATCHLIST = 4012,
  INVALID_BENEFICIARY_DOCUMENT = 4013,
  EXISTING_PHONE_ERROR = 4014,
  WRONG_PROFILE = 4015,
  NOT_FOUND_TOTP_ERROR = 4016,
  NOT_FOUND_LEGAL_RESPONSIBLE = 4017,
  USER_EMAIL_ALREADY_VERIFIED_ERROR = 4018,
  TOKEN_INVALID_ERROR = 4019,
  NOT_FOUND_BUSINESS_ERROR = 4020,
  INVALID_PLAN_ID_ERROR = 4021,
  COMPANY_NOT_ELIGIBLE = 4022,
  FAIL_TO_SEND_EMAIL = 4023,
  BUSINESS_ALREADY_INACTIVATED = 4024,
  NOT_FOUND_DOCUMENT_TYPE_ERROR = 4025,
  NOT_FOUND_DOCUMENT_ERROR = 4026,
  NOT_FOUND_COMPANY_BENEFICIARY_ERROR = 4027,
  INVALID_IMAGES_ERROR = 4028,
  MONGO_ERROR = 4029,
  FAIL_TO_RESET_HEALTH_DECLARATION = 4030,
  BENEFICIARY_AGE_ERROR = 4031,
  DOCUMENT_NOT_GIVEN = 4032,
  BENEFICIARY_UPDATE_ERROR = 4033,
  FAIL_TO_SEND_SMS = 4034,
  WRONG_UPDATE_COMMERCIAL_PROPOSAL_DATA = 4035,
  FINANCIAL_ANALYSIS_NOT_APPROVED_ERROR = 4035,
  INVALID_STEP = 4036,
  DOCUMENT_ALREADY_EXISTS_ERROR = 4037,
  GET_CONTACTS_BY_EMAIL_FROM_HUBSPOT_ERROR = 4038,
  GET_DEALS_BY_CONTACT_FROM_HUBSPOT_ERROR = 4039,
  GET_COMPANIES_BY_CONTACT_FROM_HUBSPOT_ERROR = 4040,
  CREATE_CONTACT_ON_HUBSPOT_ERROR = 4041,
  CREATE_COMPANY_ON_HUBSPOT_ERROR = 4042,
  CREATE_DEAL_ON_HUBSPOT_ERROR = 4043,
  UPDATE_DEAL_ON_HUBSPOT_ERROR = 4044,
  BENEFICIARY_OR_CNPJ_NOT_FOUND_ERROR = 4045,
  CREATE_OBJECT_ASSOCIATION_ERROR = 4046,
  NOT_FOUND_DOCUMENT_STATUS_ERROR = 4047,
  LEGAL_RESPONSIBLE_NOT_FOUND = 4048,
  FORBIDDEN_ERROR = 5000,
  DUPLICATED_WATCHLIST_ERROR = 6000,
  DUPLICATED_USER_ERROR = 6001,
  DUPLICATED_COMPANY_ERROR = 6002,
  DUPLICATED_BUSINESS_ERROR = 6003,
  DUPLICATED_BENEFICIARY_ERROR = 6004,
  DUPLICATED_DEPENDENT_NAME_ERROR = 6005,
  PLANS_NOT_FOUND_ERROR = 7000,
  COMPANY_NOT_VALID = 400,
  TOKEN_INVALID_RESEND_EMAIL = 500,
  FAIL_PUBLISH_MESSAGE_GOOGLE = 400,
  EXTERNAL_API_NOT_FOUND = 404,
  ERROR_GET_PAYMENT_INFO = 400,
  INTERNAL_SERVER_ERROR = 500,
  LEGAL_RESPONSIBLE_FOUND = 302,
  ERROR_DELETING_DOCUMENT = 400
}

export const ErrorMap = {
  [ErrorCode.GENERIC_ERROR]: {
    status: 400,
    message: 'Generic Error'
  },
  [ErrorCode.DUPLICATED_WATCHLIST_ERROR]: {
    status: 400,
    message: 'Duplicated watchlist'
  },
  [ErrorCode.DUPLICATED_BENEFICIARY_ERROR]: {
    status: 400,
    message: 'Duplicated beneficiary'
  },
  [ErrorCode.DUPLICATED_USER_ERROR]: {
    status: 400,
    message: 'Duplicated user'
  },
  [ErrorCode.DUPLICATED_COMPANY_ERROR]: {
    status: 400,
    message: 'Duplicated company'
  },
  [ErrorCode.DUPLICATED_BUSINESS_ERROR]: {
    status: 400,
    message: 'Duplicated business'
  },
  [ErrorCode.NOT_FOUND_WATCHLIST_ERROR]: {
    status: 404,
    message: 'Watchlist not found'
  },
  [ErrorCode.NOT_FOUND_BENEFICIARY_ERROR]: {
    status: 404,
    message: 'Beneficiary not found.'
  },
  [ErrorCode.NOT_FOUND_COMPANY_ERROR]: {
    status: 404,
    message: 'Company not found'
  },
  [ErrorCode.NOT_FOUND_LEGAL_RESPONSIBLE]: {
    status: 404,
    message: 'Legal responsible not found'
  },
  [ErrorCode.NOT_FOUND_USER_ERROR]: {
    status: 404,
    message: 'User not found'
  },
  [ErrorCode.NOT_FOUND_BUSINESS_ERROR]: {
    status: 404,
    message: 'Business not found'
  },
  [ErrorCode.INVALID_EMAIL_ERROR]: {
    status: 400,
    message: 'Invalid Email'
  },
  [ErrorCode.EXISTING_EMAIL_ERROR]: {
    status: 400,
    message: 'Existing Email'
  },
  [ErrorCode.UNAUTHORIZED_ERROR]: {
    status: 401,
    message: 'Unauthorized'
  },
  [ErrorCode.TOKEN_INVALID_ERROR]: {
    status: 401,
    message: 'Token invalid'
  },
  [ErrorCode.FORBIDDEN_ERROR]: {
    status: 403,
    message: 'Forbidden'
  },
  [ErrorCode.INVALID_CEP_FORMAT]: {
    status: 400,
    message: 'Invalid CEP format'
  },
  [ErrorCode.BAD_REQUEST]: {
    status: 400,
    message: 'Bad Request'
  },
  [ErrorCode.HOLDER_INVALID]: {
    status: 400,
    message: 'The holderId is related to a dependent profile'
  },
  [ErrorCode.NOT_FOUND_EMPLOYEE_PROFILE]: {
    status: 400,
    message: 'Employee profile not found'
  },
  [ErrorCode.MISSING_UNION_DATE]: {
    status: 400,
    message: 'Missing union date'
  },
  [ErrorCode.BENEFICIARY_WITH_WATCHLIST]: {
    status: 400,
    message: 'Beneficiary with Watchlist'
  },
  [ErrorCode.INVALID_BENEFICIARY_DOCUMENT]: {
    status: 400,
    message: 'Invalid CPF'
  },
  [ErrorCode.DUPLICATED_DEPENDENT_NAME_ERROR]: {
    status: 400,
    message: 'Duplicated Dependent Name'
  },
  [ErrorCode.EXISTING_PHONE_ERROR]: {
    status: 400,
    message: 'Existing Phone'
  },
  [ErrorCode.WRONG_PROFILE]: {
    status: 400,
    message: 'Wrong Profile'
  },
  [ErrorCode.NOT_FOUND_TOTP_ERROR]: {
    status: 400,
    message: 'Not found totp secret in .env file'
  },
  [ErrorCode.PLANS_NOT_FOUND_ERROR]: {
    status: 404,
    message: 'Plans not found'
  },
  [ErrorCode.USER_EMAIL_ALREADY_VERIFIED_ERROR]: {
    status: 400,
    message: 'This user seems to be already verified'
  },
  [ErrorCode.INVALID_PLAN_ID_ERROR]: {
    status: 400,
    message: 'Invalid planId found.'
  },
  [ErrorCode.NOT_FOUND_DOCUMENT_TYPE_ERROR]: {
    status: 404,
    message: 'Document type not found.'
  },
  [ErrorCode.NOT_FOUND_DOCUMENT_ERROR]: {
    status: 404,
    message: 'Document not found.'
  },
  [ErrorCode.BUSINESS_ALREADY_INACTIVATED]: {
    status: 400,
    message: 'Business seems to be already not active.'
  },
  [ErrorCode.NOT_FOUND_COMPANY_BENEFICIARY_ERROR]: {
    status: 404,
    message: 'Company or beneficiary not found.'
  },
  [ErrorCode.INVALID_IMAGES_ERROR]: {
    status: 400,
    message: 'Invalid images archives.'
  },
  [ErrorCode.COMPANY_NOT_ELIGIBLE]: {
    status: 400,
    message: 'This company is not eligible.'
  },
  [ErrorCode.COMPANY_NOT_VALID]: {
    status: 400,
    message: 'This document does not belong to this company.'
  },
  [ErrorCode.FAIL_TO_SEND_EMAIL]: {
    status: 500,
    message: 'Internal error when tried to send email.'
  },
  [ErrorCode.FAIL_PUBLISH_MESSAGE_GOOGLE]: {
    status: 400,
    message: 'Error sending message to google.'
  },
  [ErrorCode.EXTERNAL_API_NOT_FOUND]: {
    status: 404,
    message: 'External Api not found.'
  },
  [ErrorCode.MONGO_ERROR]: {
    status: 500,
    message: 'Error trying to upload Health declaration, check MONGO_URI.'
  },
  [ErrorCode.FAIL_TO_RESET_HEALTH_DECLARATION]: {
    status: 500,
    message: 'Error trying to reset Health declaration.'
  },
  [ErrorCode.BENEFICIARY_AGE_ERROR]: {
    status: 400,
    message: 'Beneficiary older than 18 should present document.'
  },
  [ErrorCode.DOCUMENT_NOT_GIVEN]: {
    status: 400,
    message: 'Beneficiary should present document.'
  },
  [ErrorCode.BENEFICIARY_UPDATE_ERROR]: {
    status: 500,
    message: 'Error trying to update beneficiary.'
  },
  [ErrorCode.FAIL_TO_SEND_SMS]: {
    status: 500,
    message: 'Error trying send SMS.'
  },
  [ErrorCode.WRONG_UPDATE_COMMERCIAL_PROPOSAL_DATA]: {
    status: 400,
    message: 'If commercialProposalApproved is false you should not be using this endpoint.'
  },
  [ErrorCode.FINANCIAL_ANALYSIS_NOT_APPROVED_ERROR]: {
    status: 400,
    message: 'FinancialAnalysis not approved.'
  },
  [ErrorCode.INVALID_STEP]: {
    status: 400,
    message: 'Improper step, should be one of StepEnum.'
  },
  [ErrorCode.DOCUMENT_ALREADY_EXISTS_ERROR]: {
    status: 409,
    message: 'Already have a document type with status SENT or APPROVED.'
  },
  [ErrorCode.ERROR_GET_PAYMENT_INFO]: {
    status: 400,
    message: 'Error get data payments info.'
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on server side'
  },
  [ErrorCode.ERROR_DELETING_DOCUMENT]: {
    status: 400,
    message: 'Error deleting document'
  },
  [ErrorCode.GET_CONTACTS_BY_EMAIL_FROM_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to get contacts from an e-mail.'
  },
  [ErrorCode.GET_DEALS_BY_CONTACT_FROM_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to get the deals from a contact.'
  },
  [ErrorCode.GET_COMPANIES_BY_CONTACT_FROM_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to get companies from a contact.'
  },
  [ErrorCode.CREATE_CONTACT_ON_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to create a contact.'
  },
  [ErrorCode.CREATE_COMPANY_ON_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to create a company.'
  },
  [ErrorCode.CREATE_DEAL_ON_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to create a deal.'
  },
  [ErrorCode.UPDATE_DEAL_ON_HUBSPOT_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to update a deal.'
  },
  [ErrorCode.BENEFICIARY_OR_CNPJ_NOT_FOUND_ERROR]: {
    status: 400,
    message: 'Could not find any user or company linked with the document.'
  },
  [ErrorCode.CREATE_OBJECT_ASSOCIATION_ERROR]: {
    status: 500,
    message: 'An unexpected error occurred on hubspot when trying to create an object association.'
  },
  [ErrorCode.NOT_FOUND_DOCUMENT_STATUS_ERROR]: {
    status: 400,
    message: 'Document status not found.'
  },
  [ErrorCode.LEGAL_RESPONSIBLE_FOUND]: {
    status: 303,
    message: 'Internal legal responsible found.'
  },
  [ErrorCode.LEGAL_RESPONSIBLE_NOT_FOUND]: {
    status: 404,
    message: 'Legal responsible not found.'
  }
}

export default class ApiError extends Error {
  status: number
  code: number
  message: string

  constructor(status: number, code: number, message: string) {
    super(message)

    this.status = status
    this.code = code
  }
}
