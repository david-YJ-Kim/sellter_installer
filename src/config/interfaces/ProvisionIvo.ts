interface Header {
  // Define properties for the head, if any; for now, it is null
  [key: string]: any; // Adjust as necessary or define specific properties
}

// Define the Body interface
interface ProvInstallInfoRepBody {
  siteId: string | null; // siteId can be a string or null
  version: string; // version is a string
  servicePort: string; // servicePort is a string
  satellitePort: string; // satellitePort is a string
  javaOptions: string; // javaOptions is a string
}

export enum ProvInstallFileType {
  JAVA = 'JAVA',
  JAR = 'JAR',
  PROP = 'PROP',
  DATA = 'DATA',
}

export interface ProvInstallInfoRepIvo {
  head: Header | null;
  body: ProvInstallInfoRepBody;
}
