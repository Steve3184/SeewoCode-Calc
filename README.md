# SeewoCode-Calc [Seewo解锁码计算器]

SeewoCode-Calc 是一个用于计算 Seewo 设备解锁码的小工具。该项目使用了 jsQR 和 crypto-js 库来实现解码和计算功能。

## 功能特点

- **解码二维码**: 使用 jsQR 库解析 Seewo 设备上的二维码信息
- **计算解锁码**: 使用 crypto-js 库对解析后的数据进行解密，获取设备的解锁码
- **跨平台兼容**: 最低支持Android Webview 67

## 在线Demo

https://seewo.steve3184.top/

## 如何使用

1. **克隆本项目**:

   ```shell
   git clone https://github.com/Steve3184/SeewoCode-Calc.git
   ```

2. **运行项目**: (推荐使用Nginx)

   ```shell
   python3 -m http.server 8080
   ```

   这将在[http://localhost:8080/]启动一个本地服务器

3. **操作流程**:
   - 打开应用后，扫描 Seewo 设备上的激活码二维码
   - 应用将解析二维码信息并计算生成解锁码
   - 最后应用将显示解锁码供用户使用

## 技术栈

- **JavaScript**: 主要编程语言。
- **jsQR**: 用于解析二维码的 JavaScript 库。
- **crypto-js**: 用于加密解密的 JavaScript 库。

## 贡献者

- 100% - [Steve3184](https://github.com/Steve3184)

如果你发现任何问题或有改进建议，请随时提出 Issue 或提交 Pull Request。我们欢迎各种形式的贡献！

## 许可证

[MIT License](LICENSE)
