export interface ScanRequest {
  url: string;
  scanType: 'XSS' | 'CSRF';
  payloads?: string[];
}

export interface SecurityHeaders {
  xFrameOptions: boolean;
  csp: boolean;
  xContentTypeOptions: boolean;
  strictTransportSecurity: boolean;
  referrerPolicy: boolean;
}

export interface ScanResult {
  vulnerabilities: {
    type: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    location?: string;
  }[];
  timestamp: string;
}
