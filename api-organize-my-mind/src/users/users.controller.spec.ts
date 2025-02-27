import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service"; // Importe o UsersService
import { SafeUser } from "../auth/dto/safeUser.dto"; // Importe SafeUser
import { NotFoundException } from "@nestjs/common"; // Importe NotFoundException (se for usar nos testes)

describe("UsersController", () => {
	let controller: UsersController;
	let mockUsersService: {
		// Mock do UsersService
		findById: jest.Mock<Promise<SafeUser>, [string]>;
	};

	beforeEach(async () => {
		mockUsersService = {
			findById: jest.fn(), // Inicializa o mock de findById
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController], // Declara o Controller que vamos testar
			providers: [
				{
					provide: UsersService, // Provide para UsersService
					useValue: mockUsersService, // Use o mockUsersService
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	// Aqui virão os testes específicos para os métodos do controller

	describe("getProfile", () => {
		it("should return the user profile", async () => {
			// 1. Arrange (Preparação)
			const userId = "some-user-id";
			const expectedSafeUser: SafeUser = {
				// Define o SafeUser esperado
				id: userId,
				email: "test@example.com",
				username: "testuser",
				fullName: "Test User",
				bio: "",
				created_at: new Date(),
				isPublic: true,
			};
			mockUsersService.findById.mockResolvedValue(expectedSafeUser); // Mock findById para retornar o SafeUser esperado

			const mockRequest = { user: { id: userId } }; // Simula o objeto 'req' com user.id

			// 2. Act (Ação)
			const result = await controller.getProfile(mockRequest); // Chama getProfile

			// 3. Assert (Verificações)
			expect(mockUsersService.findById).toHaveBeenCalledWith(userId); // Verifica se findById foi chamado com o userId correto
			expect(result).toEqual(expectedSafeUser); // Verifica se o resultado do controller é o SafeUser esperado
		});
	});
});
