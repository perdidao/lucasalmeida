export default function (plop) {
  plop.setGenerator('component', {
    description: 'Funcional component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.types.ts',
        templateFile: 'plop-templates/Component.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.styles.ts',
        templateFile: 'plop-templates/Component.styles.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        template: "export * from './{{name}}'\n",
      },
    ],
  })
}
