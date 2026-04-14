// --- Products Page — Type Definitions ---

export interface PremiumCareFeature {
  title: string;
  description: string;
  /**
   * PrimeNG icon suffix only.
   * Consumed in the template as: `'pi ' + icon`
   * e.g. `'pi-users'` → `'pi pi-users'`
   */
  icon: string;
}

export interface PremiumCareModules {
  frontOffice: string[];
  financial: string[];
  backOffice: string[];
}

export interface ModuleDetail {
  id: string;
  header: string;
  description: string;
  features: string[];
}

export interface ErpModule {
  title: string;
  /** PrimeNG icon suffix only — see {@link PremiumCareFeature.icon} */
  icon: string;
}

export interface Platform {
  title: string;
  subtitle: string;
  /** PrimeNG icon suffix only — see {@link PremiumCareFeature.icon} */
  icon: string;
}
