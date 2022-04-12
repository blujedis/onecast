
import { spawnSync } from 'child_process';
import { join } from 'path';
const CWD = process.cwd();

const sourceDir = join(CWD, '../../galio/dist');
const target = join(CWD, 'node_modules', 'galio-framework/dist');

const cleanGalio = () => {
  spawnSync('rm', ['-rf', target], { stdio: 'inherit' });
};

const copyGalio = () => {
  cleanGalio();
  spawnSync('cp', ['-r', sourceDir, target], { stdio: 'inherit' });
};

copyGalio();