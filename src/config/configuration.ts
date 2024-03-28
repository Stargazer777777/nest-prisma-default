import { parse } from 'yaml'; // 导入yaml库，用于解析yaml文件
import * as path from 'path'; // 导入path库，用于处理文件路径
import * as fs from 'fs'; // 导入fs库，用于读取文件

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV || 'prod'; // 返回环境变量中的RUNNING_ENV，如果不存在则返回默认值'prod'
};

export const IS_DEV = getEnv() === 'dev'; // 判断当前运行环境是否为'dev'，返回布尔值

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv(); // 获取当前运行环境
  console.log(environment, '当前运行的环境'); // 打印当前运行环境
  const yamlPath = path.join(process.cwd(), `./application.${environment}.yml`); // 根据当前运行环境拼接yaml文件路径
  const file = fs.readFileSync(yamlPath, 'utf8'); // 同步读取yaml文件内容
  const config = parse(file); // 解析yaml文件内容为对象

  const projectRootPath = path.join(__dirname, '../../');
  config['ProjectRootPath'] = projectRootPath;
  return config; // 返回解析后的配置对象
};

export default getConfig;
