import { Test, TestingModule } from "@nestjs/testing";
import { SafeUser } from "../auth/dto/safeUser.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AccessToken } from "./dto/accessToken.dto";
import { RegisterDto } from "./dto/register.dto";

describe("UsersController", () => {
	let controller: AuthController;
	let mockAuthService: {
		register: jest.Mock<Promise<SafeUser>, [RegisterDto]>;
		login: jest.Mock<Promise<AccessToken>, [LoginDto]>;
	};

	beforeEach(async () => {
		mockAuthService = {
			register: jest.fn(),
			login: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("register", () => {
		it("should register a new user and return SafeUser", async () => {
			const registerDto: RegisterDto = {
				email: "testexample@example.com",
				fullName: "Example Test Of Silva",
				username: "ExampleTest",
				password: "testTestTest123",
			};
			const expectedSafeUser: SafeUser = {
				id: "some-user-id",
				email: registerDto.email,
				username: registerDto.username,
				fullName: registerDto.fullName,
				isPublic: true,
				bio: "",
				created_at: new Date(),
			};
			mockAuthService.register.mockResolvedValue(expectedSafeUser);

			const result = await controller.register(registerDto);

			expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
			expect(result).toEqual(expectedSafeUser);
		});

		it("should throw BadRequestException if register fails", async () => {
			const registerDto: RegisterDto = {
				email: "invalid-email",
				fullName: "Invalid Name",
				username: "invaliduser",
				password: "short",
			};
			mockAuthService.register.mockRejectedValue(new BadRequestException());

			await expect(controller.register(registerDto)).rejects.toThrow(
				BadRequestException,
			);
			expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
		});
	});

	describe("login", () => {
		it("should login user and return AccessToken", async () => {
			const loginDto: LoginDto = {
				email: "testexample@example.com",
				password: "testTestTest123",
			};
			const expectedAccessToken: AccessToken = {
				access_token: "mocked-access-token",
			};
			mockAuthService.login.mockResolvedValue(expectedAccessToken);

			const result = await controller.login(loginDto);

			expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
			expect(result).toEqual(expectedAccessToken);
		});

		it("should throw UnauthorizedException if login fails", async () => {
			const loginDto: LoginDto = {
				email: "testexample@example.com",
				password: "wrong-password",
			};
			mockAuthService.login.mockRejectedValue(new UnauthorizedException());

			await expect(controller.login(loginDto)).rejects.toThrow(
				UnauthorizedException,
			);
			expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
		});
	});
});
