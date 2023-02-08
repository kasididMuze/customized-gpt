import { Configuration as OAConfiguration, CreateFineTuneRequest, FineTune, ListFineTunesResponse, OpenAIApi } from 'openai'
import { config } from '../configs'

export class OpenAIModel {
  private _openaiInstance: OpenAIApi
  private static _instance: OpenAIModel

  public static getInstance(): OpenAIModel {
    return this._instance ||(this._instance = new OpenAIModel({}))
  }

  constructor(options?: any) {
    const createConfig = new OAConfiguration({
      organization: config.openai.orgId,
      apiKey: config.openai.apiKey,
      ...options
    })
    console.log('create new openai instance ~')
    this._openaiInstance = new OpenAIApi(createConfig)
  }
  
  async listFineTuning(): Promise<ListFineTunesResponse> {
    const response = await this._openaiInstance.listFineTunes();
    return response.data

  }

  async validateIsInProgress(): Promise<FineTune[]> {
    const fineTunes = await this.listFineTuning()
    const pendingFineTunes: FineTune[] = []
    if (fineTunes.data && !fineTunes.data.length) {
      return pendingFineTunes
    }

    // validate as false if any of ft status is pending 
    for (const ft of fineTunes.data) {
      if (ft.status === 'pending') {
        pendingFineTunes.push(ft)
      }
    }

    return pendingFineTunes
  }

  async fineTuning(fileName: string): Promise<FineTune> {
    const ftResult = await this._openaiInstance.createFineTune({
      training_file: fileName,
      model: config.openai.finetune.model
    })
    return ftResult.data
  }

  async completion(prompt: string) {

  }
}