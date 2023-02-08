interface FineTuneConfig {
  fileName: string
  model: string
}

interface AppConfig {
  openai: {
    apiKey: string,
    orgId?: string, // can be undefined if using personal openai access
    finetune: FineTuneConfig
  }
}

export const config: AppConfig = {
  openai: {
    apiKey: process.env.API_KEY || 'missing_config:API_KEY',
    orgId: process.env.ORG_ID,
    finetune: {
      fileName: '',
      model: process.env.model || 'missing_config:TUNING_MODEL'
    }
  }
}