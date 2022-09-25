# Edgeless Hub Fresh

（WIP）新鲜的 Edgeless Hub 重构，非常的新鲜非常的美味（误）

## 架构

通过主线程提供低层服务（位于`electron/main/services`），渲染线程通过与主线程服务一一对应的 bridge 封装（位于`src/services`
）调用主线程中的服务。

## 开发

`yarn dev`

## 构建

`yarn build`
