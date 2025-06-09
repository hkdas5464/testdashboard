import { PageHeader } from '@/components/layout/page-header';
import { SettingsTabs } from '@/components/settings/settings-tabs';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Settings" 
        description="Manage your profile and application preferences" 
      />
      <SettingsTabs />
    </div>
  );
}