import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container, PageHeader, Section } from '@/components/ui-kit';
import { LoadingState, EmptyState } from '@/components/ui-kit/States';
import { useProfile, useSkills, useInterests } from '@/hooks/data';
import type { Skill } from '@/types/database';

const SKILL_GROUPS: { value: string; label: string }[] = [
  { value: 'technical', label: 'Technical' },
  { value: 'computer', label: 'Computer' },
  { value: 'behavioral', label: 'Behavioral' },
];

const About = () => {
  const { data: profile, isLoading } = useProfile();
  const { data: skills = [] } = useSkills();
  const { data: interests = [] } = useInterests();
  const [tab, setTab] = useState('technical');

  if (isLoading && !profile) return <LoadingState className="min-h-[60vh]" />;

  const bioCards = profile?.long_bio ?? [];

  return (
    <>
      <PageHeader
        kicker="About"
        title="A computer engineer working across AI, research, and teaching."
        intro={profile?.short_bio ?? undefined}
      />

      {/* Narrative cards */}
      {bioCards.length > 0 && (
        <Section divided>
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {bioCards.map((card) => (
              <article key={card.heading} className="bg-card p-7">
                <h3 className="font-serif text-xl font-semibold">{card.heading}</h3>
                <div className="mt-3 h-px w-10 bg-primary" />
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">{card.body}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      <Section kicker="Capabilities" heading="Skills" divided>
        {skills.length === 0 ? (
          <EmptyState message="Skills will appear here." />
        ) : (
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-8 inline-flex h-auto gap-1 rounded-sm bg-muted p-1">
              {SKILL_GROUPS.map((g) => (
                <TabsTrigger
                  key={g.value}
                  value={g.value}
                  className="rounded-sm px-4 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {g.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {SKILL_GROUPS.map((g) => (
              <TabsContent key={g.value} value={g.value} className="mt-0">
                <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {skills.filter((s) => s.category === g.value).map((skill) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </Section>

      {/* Interests */}
      {interests.length > 0 && (
        <Section kicker="Research directions" heading="Academic interests" divided>
          <ul className="flex flex-wrap gap-2.5">
            {interests.map((interest) => (
              <li
                key={interest.id}
                className="border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {interest.name}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};

const SkillBar = ({ skill }: { skill: Skill }) => (
  <div>
    <div className="mb-2 flex items-baseline justify-between gap-4">
      <span className="text-sm font-medium">{skill.name}</span>
      <span className="text-xs tabular-nums text-muted-foreground">{skill.proficiency}%</span>
    </div>
    <div className="h-1.5 w-full bg-muted">
      <div
        className="h-full bg-primary transition-[width] duration-700"
        style={{ width: `${Math.min(100, Math.max(0, skill.proficiency))}%` }}
      />
    </div>
  </div>
);

export default About;
