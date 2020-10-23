export interface PortalData {
    created_at: Date;
    file_accessed_at: Date;
    file_created_at: Date;
    file_modified_at: Date;
    filename: string;
    filesize: number;
    folder_name: string;
    folder_type: string;
    id: number;
    location: string;
    server: string;
}

export interface ReportData {
    DISTANCE_ARCHIVE: number;
    DISTANCE_UNPROCESSED: number;
    EINOVOICE_ARCHIVE: number;
    EINOVOICE_AVSAP: number;
    EINOVOICE_IENABLE: number;
    EINOVOICE_MDSAP: number;
    EINOVOICE_MISMATCH: number;
    EINOVOICE_MISSING: number;
    EWAYBILL_ARCHIVE: number;
    EWAYBILL_AVSAP: number;
    EWAYBILL_IENABLE: number;
    EWAYBILL_MDSAP: number;
    EWAYBILL_MISMATCH: number;
    EWAYBILL_MISSING: number;
    OUT_ARCHIVE: number;
    OUT_AVSAP: number;
    OUT_IENABLE: number;
    OUT_MDSAP: number;
    OUT_MISMATCH: number;
    OUT_MISSING: number;
    SFTP_ARCHIVE: number;
    SFTP_AVSAP: number;
    SFTP_BOT_RESPONSE: number;
    SFTP_IENABLE: number;
    SFTP_INBOT: number;
    SFTP_MDSAP: number;
    SFTP_MISMATCH: number;
    SFTP_MISSING: number;
    SFTP_MISSING_DISTANCE_SIZE: number;
    SFTP_MISSING_EINVOICE_SIZE: number;
    SFTP_MISSING_EWAYBILL_SIZE: number;
    SFTP_OUT_EINVOICE: number;
    SFTP_OUT_EWAYBILL: number;
}
