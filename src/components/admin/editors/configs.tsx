import type {
  NewsItem,
  ResearchInterest,
  EducationEntry,
  TeachingCourse,
  Award,
  ServiceEntry,
  CustomPage,
} from '@/types/database';
import type { CardListConfig, FormValues } from './CardListEditor';

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, '');

export const newsConfig: CardListConfig<NewsItem> = {
  table: 'news_items',
  title: 'News',
  desc: 'News items shown on the public site.',
  modalAdd: 'Add News Item',
  modalEdit: 'Edit News Item',
  hasVisible: true,
  cardTitle: (i) =>
    i.event_date
      ? new Date(i.event_date + 'T00:00:00').toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        })
      : '—',
  cardSub: (i) => stripHtml(i.body || '').slice(0, 80) + '…',
  emptyValues: { event_date: '', body: '' },
  itemToValues: (i) => ({ event_date: i.event_date || '', body: i.body || '' }),
  toPayload: (v) => ({ event_date: v.event_date || null, body: v.body }),
  renderForm: (v, set) => (
    <>
      <div className="field-group">
        <label>Date</label>
        <input type="date" value={v.event_date} onChange={(e) => set('event_date', e.target.value)} />
      </div>
      <div className="field-group">
        <label>Content (HTML allowed)</label>
        <textarea className="tall" value={v.body} onChange={(e) => set('body', e.target.value)} />
      </div>
    </>
  ),
};

export const researchConfig: CardListConfig<ResearchInterest> = {
  table: 'research_interests',
  title: 'Research Interests',
  desc: 'Bullet-point research interests.',
  modalAdd: 'Add Research Interest',
  modalEdit: 'Edit Research Interest',
  cardTitle: (i) => i.label,
  emptyValues: { label: '' },
  itemToValues: (i) => ({ label: i.label || '' }),
  toPayload: (v) => ({ label: v.label.trim() }),
  renderForm: (v, set) => (
    <div className="field-group">
      <label>Interest</label>
      <input type="text" value={v.label} onChange={(e) => set('label', e.target.value)} />
    </div>
  ),
};

export const awardsConfig: CardListConfig<Award> = {
  table: 'awards',
  title: 'Honors & Awards',
  desc: 'Award entries. HTML supported.',
  modalAdd: 'Add Award',
  modalEdit: 'Edit Award',
  cardTitle: (i) => stripHtml(i.label || '').slice(0, 80),
  cardSub: (i) => (i.year ? String(i.year) : ''),
  emptyValues: { label: '', year: '' },
  itemToValues: (i) => ({ label: i.label || '', year: i.year ? String(i.year) : '' }),
  toPayload: (v) => ({ label: v.label, year: v.year ? +v.year : null }),
  renderForm: (v, set) => (
    <>
      <div className="field-group">
        <label>Award (HTML allowed)</label>
        <textarea value={v.label} onChange={(e) => set('label', e.target.value)} />
      </div>
      <div className="field-group">
        <label>Year (optional)</label>
        <input
          type="number"
          min={1900}
          max={2200}
          placeholder="2024"
          value={v.year}
          onChange={(e) => set('year', e.target.value)}
        />
      </div>
    </>
  ),
};

export const educationConfig: CardListConfig<EducationEntry> = {
  table: 'education_entries',
  title: 'Education',
  modalAdd: 'Add Education',
  modalEdit: 'Edit Education',
  emptyState: 'No education entries.',
  cardTitle: (i) => i.degree,
  cardSub: (i) => i.institution,
  emptyValues: { degree: '', institution: '' },
  itemToValues: (i) => ({ degree: i.degree || '', institution: i.institution || '' }),
  toPayload: (v) => ({ degree: v.degree.trim(), institution: v.institution.trim() }),
  renderForm: (v, set) => (
    <>
      <div className="field-group">
        <label>Degree</label>
        <input
          type="text"
          placeholder="Ph.D., Electrical Engineering"
          value={v.degree}
          onChange={(e) => set('degree', e.target.value)}
        />
      </div>
      <div className="field-group">
        <label>Institution</label>
        <input
          type="text"
          placeholder="University Name, City, Country"
          value={v.institution}
          onChange={(e) => set('institution', e.target.value)}
        />
      </div>
    </>
  ),
};

export const teachingConfig: CardListConfig<TeachingCourse> = {
  table: 'teaching_courses',
  title: 'Teaching',
  desc: 'Each row is one course. Courses with the same institution name are grouped together on the public site.',
  addLabel: '+ Add Course',
  modalAdd: 'Add Course',
  modalEdit: 'Edit Course',
  emptyState: 'No teaching entries.',
  cardTitle: (i) => i.label,
  cardSub: (i) => i.institution || '',
  emptyValues: { label: '', institution: '' },
  itemToValues: (i) => ({ label: i.label || '', institution: i.institution || '' }),
  toPayload: (v) => ({ label: v.label.trim(), institution: v.institution.trim() }),
  renderForm: (v, set) => (
    <>
      <div className="field-group">
        <label>Course</label>
        <input
          type="text"
          placeholder="ECE 566 — Wireless Networking (Fall 2024)"
          value={v.label}
          onChange={(e) => set('label', e.target.value)}
        />
      </div>
      <div className="field-group">
        <label>Institution (optional — used for grouping)</label>
        <input
          type="text"
          placeholder="North Carolina State University"
          value={v.institution}
          onChange={(e) => set('institution', e.target.value)}
        />
      </div>
    </>
  ),
};

export const serviceConfig: CardListConfig<ServiceEntry> = {
  table: 'service_entries',
  title: 'Professional Service',
  desc: 'Each row is one service item. Items with the same category are grouped on the public site.',
  addLabel: '+ Add Item',
  modalAdd: 'Add Service Item',
  modalEdit: 'Edit Service Item',
  emptyState: 'No service entries.',
  cardTitle: (i) => i.label,
  cardSub: (i) => i.category,
  emptyValues: { category: '', label: '' },
  itemToValues: (i) => ({ category: i.category || '', label: i.label || '' }),
  toPayload: (v) => ({ category: v.category.trim(), label: v.label.trim() }),
  renderForm: (v, set) => (
    <>
      <div className="field-group">
        <label>Category</label>
        <input
          type="text"
          placeholder="Technical Program Committees"
          value={v.category}
          onChange={(e) => set('category', e.target.value)}
        />
      </div>
      <div className="field-group">
        <label>Item (HTML allowed)</label>
        <textarea
          rows={3}
          placeholder="IEEE INFOCOM (2020–present)"
          value={v.label}
          onChange={(e) => set('label', e.target.value)}
        />
      </div>
    </>
  ),
};

const slugify = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

export const pagesConfig: CardListConfig<CustomPage> = {
  table: 'custom_pages',
  title: 'Custom Pages',
  desc: 'Add extra sections (e.g. "Lab", "Gallery"). They appear in the nav after built-in sections.',
  addLabel: '+ Add Page',
  modalAdd: 'Add Custom Page',
  modalEdit: 'Edit Page',
  emptyState: 'No custom pages yet.',
  wide: true,
  hasVisible: true,
  cardTitle: (i) => i.title,
  cardSub: (i) => `/${i.slug}`,
  emptyValues: { title: '', slug: '', content: '' },
  itemToValues: (i) => ({ title: i.title || '', slug: i.slug || '', content: i.content || '' }),
  toPayload: (v) => ({ title: v.title.trim(), slug: slugify(v.slug), content: v.content }),
  renderForm: (v, set) => (
    <>
      <div className="field-row">
        <div className="field-group">
          <label>Page Title</label>
          <input
            type="text"
            placeholder="Lab Members"
            value={v.title}
            onChange={(e) => set('title', e.target.value)}
          />
        </div>
        <div className="field-group">
          <label>Slug (URL key, no spaces)</label>
          <input
            type="text"
            placeholder="lab"
            value={v.slug}
            onChange={(e) => set('slug', e.target.value)}
          />
        </div>
      </div>
      <div className="field-group">
        <label>Content (HTML)</label>
        <textarea className="tall" value={v.content} onChange={(e) => set('content', e.target.value)} />
      </div>
    </>
  ),
};
