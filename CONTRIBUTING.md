# How to contribute
In order to contribute to this repository please read the following guide.

## Creating components
To create a new component run the following script:

`npm run create:component NewComponent`

This will create a new folder with all relevant files. The initial version will be `1.0.0-alpha.1`.

__Component structure__
```
project
│
└───components
│   │
│   └───NewComponent
│       │   index.js
│       │   package.json
│       │   README.md
│       │   
│       └───src
│           │   NewComponent.js
│       │
│       └───example
│           │   NewComponent.example.js
│       │   
|       └───test
|           │   NewComponent.spec.js
│   
└───themes
│   │
│   └───<theme version>
│       └───less
│           └───components
│               └───newcomponent.less
```

### Component meta information
Additional information about the component is stored in the `package.json` inside the component folder.
Following sections should be maintained.
```json
{
  "contributors": [
    {
      "name": "Your Name",
      "email": "you@xxx.com"
    }
  ],
  "liveExamples": {
    "xxx": "https://xxx.com"
  }
}
```

### Component lifecycle
Initially the component starts with a prerelease version (`alpha`). You can build a committee consisting of developers and ux/design people, who are managing the lifecycle and development process. The committee decides when components get promoted to new stages, for instance from `alpha` to `beta`.

A component lifecycle in general could be described as the following:
1. `alpha` indicates a new component in the repository. It might be already used in production, but it was not adopted yet by others. You can use an `alpha` at your own risk as it is still in development and might have breaking changes.
2. `beta` components are adopted by more than one team (and also used in production). It is an approval phase in which bug fixes and improvements still can happen.
3. `stable` is the final stage of a component after it has been approved by the committee. Users of `alpha` and `beta` stages are asked to upgrade to `stable`.

## Making changes
1. Create a new branch from development. As branch name use the next version, for instance `git checkout -b pagination-1.0.0-alpha.2`
2. Commit your changes
3. Create a merge request to development
4. Ask for a code review
5. Merge your code when you received at least one +1


## Publishing components
We use [lerna](https://github.com/lerna/lerna) to publish components to the registry. The build and publishing process is not finalized and therefore not implemented yet. The main steps of the process are:
1. Merge feature branch to development
2. Create a release branch from development
  - `npm run release start` creates release branch and generates changelog
3. Bump package versions
  - `npm run publish` bumps the version, publishes the updated packages to the registry and creates and pushes a git tag
6. Merge release branch to master and development
