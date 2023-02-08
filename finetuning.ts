import { OpenAIModel } from "./models/openai.model";
import { argv } from 'node:process';
import { argumentResolver } from "./utils/argHandler";

const DEFAULT_TUNING_FILE = process.env.TUNING_FILE || 'file not existing'

async function finetuning(fileName: string = DEFAULT_TUNING_FILE) {
  // run data here
  const openAI = OpenAIModel.getInstance()
  const pendings = await openAI.validateIsInProgress()
  if (pendings.length) {
    console.log('ft is still running...👀')
    console.log(JSON.stringify(pendings, undefined, 2))
    return
  }
  console.log('Tuning on data file: ', fileName)
  await openAI.fineTuning(fileName)
  console.log('All FTs are finished. 🎉')
}

const fileName = argumentResolver(argv, '-f', undefined)
// finetuning start here...
finetuning(fileName)