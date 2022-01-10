.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-AddBuildConfigFunction
.PHONY: build-UpdateBuildConfigFunction

build-AddBuildConfigFunction:
	$(MAKE) HANDLER=src/handlers/addBuildConfig.ts build-lambda-common

build-UpdateBuildConfigFunction:
	$(MAKE) HANDLER=src/handlers/updateBuildConfig.ts build-lambda-common

build-lambda-common:
	npm install --ignore-scripts
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	node_modules/typescript/bin/tsc --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/" --ignore-scripts
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes aren't related to dependencies
