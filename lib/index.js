import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取所有规则文件
async function loadRules() {
  const rulesDir = path.join(__dirname, 'rules');
  const files = await readdir(rulesDir);
  const rules = {};

  for (const file of files) {
    if (file.endsWith('.js')) {
      const ruleName = path.basename(file, '.js');
      const fileUrl = pathToFileURL(path.join(rulesDir, file)).href;
      const ruleModule = await import(fileUrl);
      rules[ruleName] = ruleModule.default || ruleModule;
    }
  }

  return rules;
}

const rules = await loadRules();

const plugin = {
  rules,
  configs: {
    recommended: {
      plugins: {
        sya: { rules },
      },
      rules: Object.fromEntries(
        Object.keys(rules).map((ruleName) => [`sya/${ruleName}`, 'error'])
      ),
    },
  },
};

export default plugin;