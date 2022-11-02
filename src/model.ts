/* eslint-disable new-cap, max-classes-per-file */
import {IsInt, IsNotEmpty, IsString, Max, Min, Validate, ValidateIf} from 'class-validator';

import {
  IsHexString,
  IsNotEmptyIfOptimized,
  IsNotEmptyIfOptimizedCoverMetadata,
  IsValidPrincipalFormat,
  IsValidUrlFormat,
  IsValidVersionFormat,
  IsValidVersionFormatCoverMetadata
} from './validators';

export class BuildConfigRequest {
  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPrincipalFormat)
  canisterId?: string;

  @IsString()
  @ValidateIf((req: BuildConfigRequest) => req.delegateCanisterId !== '')
  @Validate(IsValidPrincipalFormat)
  delegateCanisterId?: string;

  @IsNotEmpty()
  @IsString()
  canisterName?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidUrlFormat)
  repoUrl?: string;

  @IsString()
  repoAccessToken?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsHexString)
  commitHash?: string;

  @IsNotEmptyIfOptimized()
  @IsString()
  @Validate(IsValidVersionFormat)
  rustVersion?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidVersionFormat)
  dfxVersion?: string;

  @IsInt()
  @Min(0)
  @Max(10)
  optimizeCount?: number;

  @IsNotEmpty()
  @IsString()
  @Validate(IsHexString)
  publicKey?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsHexString)
  signature?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPrincipalFormat)
  callerId?: string;

  @IsNotEmpty()
  @IsInt()
  timestamp?: number;
}

export class BuildWithConfigRequest {
  @IsString()
  repoAccessToken?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPrincipalFormat)
  canisterId?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPrincipalFormat)
  callerId?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsHexString)
  publicKey?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsHexString)
  signature?: string;

  @IsNotEmpty()
  @IsInt()
  timestamp?: number;
}

export class BuildWithCoverMetadataRequest {
  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPrincipalFormat)
  canisterId?: string;

  @IsString()
  repoAccessToken?: string;
}

export class CoverMetadataValidator {
  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPrincipalFormat)
  controller?: string;

  @IsNotEmpty()
  @IsString()
  canister_name?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidUrlFormat)
  repo_url?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsHexString)
  commit_hash?: string;

  @IsNotEmptyIfOptimizedCoverMetadata()
  @Validate(IsValidVersionFormatCoverMetadata)
  rust_version?: string[];

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidVersionFormat)
  dfx_version?: string;

  @IsInt()
  @Min(0)
  @Max(10)
  optimize_count?: number;
}
