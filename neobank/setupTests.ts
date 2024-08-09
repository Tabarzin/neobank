import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$', () => 'test-file-stub');
