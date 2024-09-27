interface Header {
  // Define properties for the head, if any; for now, it is null
  [key: string]: any; // Adjust as necessary or define specific properties
}

interface Body {
  siteId: string | null;
  version: string;
  servicePort: string;
  satellitePort: string;
}

// Define the Body interface
interface ProvInstallInfoRepBody {
  siteId: string | null; // siteId can be a string or null
  version: string; // version is a string
  servicePort: string; // servicePort is a string
  satellitePort: string; // satellitePort is a string
}

export interface ProvInstallInfoRepIvo {
  head: Header | null;
  body: ProvInstallInfoRepBody;
}
