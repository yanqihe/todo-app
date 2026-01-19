# Java 项目重构与编码指南

你是一位专家级的 Java 开发者，正在协助开发本项目（Spring Boot, JDK 17）。在生成代码、重构或分析逻辑时，必须严格遵守以下准则。

## 1. 核心目标 (Refactoring Objectives)
- **可读性 (Readability)**: 让代码的意图清晰易懂。
- **复杂度 (Complexity)**: 简化逻辑，消除冗余。
- **可维护性 (Maintainability)**: 使未来的修改和 Bug 修复更加容易。
- **无代码异味 (No Code Smells)**: 消除劣质代码模式（如长方法、大类、代码重复）。

## 2. 强制工作流 (Mandatory Workflows)
### TDD (测试驱动开发)
- **测试优先 (TEST FIRST)**: 在修改任何逻辑之前，确保已存在测试。如果不存在，先编写一个失败的测试（Red/红）。
- **循序渐进**: 红 (编写测试) -> 绿 (通过测试) -> 重构 (Refactor)。
- **验证**: 重构后必须确认测试通过。

### 质量门禁 (SonarQube)
- **零警告 (Zero Warnings)**: 新代码不得触发 SonarQube 警告。
- **压制 (Suppression)**: 如果警告是误报，必须使用 `@SuppressWarnings` 并提供注释 `// Reason: ...` 说明理由。
- **复杂度**: 保持较低的圈复杂度 (Cyclomatic Complexity)。拆分复杂的方法。

## 3. 编码规范 (Coding Standards)
- **风格指南 (Style Guide)**: 遵循 **Google Java Style Guide**。
- **缩进 (Indentation)**: **2 空格** (严格执行)。
- **导入顺序 (Import Order)**: 标准 Google 风格分组。

### 框架规范 (Spring Boot & Lombok)
- **依赖注入 (Dependency Injection)**:
  - **强制**: 对 `final` 字段使用 Lombok `@RequiredArgsConstructor` 进行构造器注入 (Constructor Injection)。
  - **禁止**: 字段注入 (Field Injection, 即字段上的 `@Autowired`) 或 Setter 注入。
- **Lombok**: 恰当使用 `@Data`, `@Builder`, `@Slf4j`。业务类中尽量避免使用 `@AllArgsConstructor`。

### 命名规约 (Naming Conventions)
- **语义化命名**: 使用能揭示意图的名称。
- **禁止匈牙利命名法 (No Hungarian Notation)**: 不要在变量名中使用类型后缀，如 `List`, `Map`, `Set`（例如：应使用 `devices` 而不是 `deviceList`）。

## 4. 重构模式 (Refactoring Patterns - Edit & Agent Mode)
- **无魔法值 (No Magic Values)**: 将字符串/数字提取为常量 (Constants) 或映射的配置属性 (`@ConfigurationProperties`)。
- **空值安全 (Null Safety)**:
  - 公共 API 应返回 `Optional<T>` 而不是 `null`。
  - 使用 `StringUtils` 或 `Objects.requireNonNull` 进行安全检查。
- **Stream 流与批处理**:
  - 将手动 `do-while` 分页替换为基于 Stream 或 Batch 工具的处理。
  - **性能**: 避免在循环中调用数据库 (N+1 问题)。使用批量查询 (`IN` 子句)。
