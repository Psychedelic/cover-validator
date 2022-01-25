import {
  IsHexString,
  IsNotEmptyIfOptimized,
  IsValidPrincipalFormat,
  IsValidUrlFormat,
  IsValidVersionFormat
} from "./validators";
import {IsInt, IsNotEmpty, Max, Min, Validate} from "class-validator";

export class BuildConfigRequest {
  @IsNotEmpty()
  @Validate(IsValidPrincipalFormat)
  canisterId?: string;

  @IsNotEmpty()
  canisterName?: string;

  @IsNotEmpty()
  @Validate(IsValidUrlFormat)
  repoUrl?: string;

  @IsNotEmpty()
  repoAccessToken?: string;

  @IsNotEmpty()
  @Validate(IsHexString)
  commitHash?: string;

  @IsNotEmptyIfOptimized()
  @Validate(IsValidVersionFormat)
  rustVersion?: string;

  @IsNotEmpty()
  @Validate(IsValidVersionFormat)
  dfxVersion?: string;

  @IsInt()
  @Min(0)
  @Max(10)
  optimizeCount?: number;

  @IsNotEmpty()
  @Validate(IsHexString)
  publicKey?: string;

  @IsNotEmpty()
  @Validate(IsHexString)
  signature?: string;

  @IsNotEmpty()
  @Validate(IsValidPrincipalFormat)
  userPrincipal?: string;
}

export class BuildWasmRequest {
  @IsNotEmpty()
  @Validate(IsValidPrincipalFormat)
  canisterId?: string;

  @IsNotEmpty()
  @Validate(IsHexString)
  publicKey?: string;

  @IsNotEmpty()
  repoAccessToken?: string;

  @IsNotEmpty()
  @Validate(IsHexString)
  signature?: string;

  @IsNotEmpty()
  @Validate(IsValidPrincipalFormat)
  userPrincipal?: string;
}
