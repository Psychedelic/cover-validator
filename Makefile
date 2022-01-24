.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-SaveBuildConfigFunction
.PHONY: build-BuildWithConfigFunction
.PHONY: build-BuildFunction

build-SaveBuildConfigFunction:
	$(MAKE) HANDLER=src/handlers/saveBuildConfig.ts build-lambda-common

build-BuildWithConfigFunction:
	$(MAKE) HANDLER=src/handlers/buildWithConfig.ts build-lambda-common

build-BuildFunction:
	$(MAKE) HANDLER=src/handlers/build.ts build-lambda-common

build-lambda-common:
	npm install --ignore-scripts
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	node_modules/typescript/bin/tsc --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)"
	npm install --production --prefix "$(ARTIFACTS_DIR)" --ignore-scripts
	node fileExtReplacer.js "$(ARTIFACTS_DIR)" # adding `.js` into to `import` statement
