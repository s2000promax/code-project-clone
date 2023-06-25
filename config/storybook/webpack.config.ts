import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import * as path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSVGloader } from '../build/loaders/buildSVGloader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    buildLocales: '',
    locales: '',
  };

  config.resolve!.modules!.push(paths.src);
  config.resolve!.extensions!.push('.ts', '.tsx');
  config.resolve!.alias = {
    ...config!.resolve!.alias,
    '@': paths.src,
  };

  const rules = config.module!.rules as RuleSetRule[];
  config.module!.rules = rules.map((rule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module!.rules.push(buildSVGloader());
  config.module!.rules.push(buildCssLoader(true));

  config.plugins!.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify('https://testapi.io'),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  );

  return config;
};
