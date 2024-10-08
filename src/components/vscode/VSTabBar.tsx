import { TabFrame, Tab, CloseBtn, Scrollable } from './styles';
import { useVSCode } from './vscode-provider';
import { VSFileIcon } from './VSFileIcon';

export const VSTabBar = () => {
  const vscode = useVSCode();
  return (
    <Scrollable $horizontal>
      <TabFrame>
        {vscode.tabs.map((t) => (
          <Tab
            key={t.id}
            onClick={() =>
              vscode.currentTab !== t.id ? vscode.openTab!(t.id) : null
            }
            $active={t.id === vscode.currentTab}
          >
            <VSFileIcon name={t.name} />
            {t.name}{' '}
            <CloseBtn
              onClick={(e) => {
                e.stopPropagation();
                vscode.closeTab!(t.id);
              }}
            >
              x
            </CloseBtn>
          </Tab>
        ))}
      </TabFrame>
    </Scrollable>
  );
};
