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
  userAccessToken?: string;

  @IsNotEmpty()
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
  optimizeTimes?: number;

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
