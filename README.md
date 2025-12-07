# Simple Email Campaign Manager

A minimal **Email Campaign Manager** built with **Laravel (Backend)**, **React + InertiaJS (Frontend)**, and **shadcn/ui** components.  
This project allows you to manage contacts, create email campaigns, and track email delivery status (fake sending via queued jobs).

---

## **Features**
### User module
- I use breeze authentication with inertiajs
- This is come on the fly

### Contacts
- Seed a list of contacts (name + email)
- Display contacts in a table

### Campaigns
- Create a campaign with subject and body
- Select recipients from the contact list(single - multiple -all)
- Queue emails for sending (simulated using Laravel jobs)

### Email Status Tracking
- Track status per recipient: `pending`, `sent`, `failed`
- View campaign history and per-campaign delivery results
- I use here  simulate delay ,for testing purpose

### Architecture

This project follows **Laravel best practices** with a clean separation of concerns and modern architectural patterns:

#### **1. Layered Architecture**
- **Controllers** (`CampaignController`, `ContactController`) - Handle HTTP requests/responses and delegate to services
- **Services** (`CampaignService`) - Encapsulate business logic and orchestrate operations
- **Models** (`Campaign`, `CampaignRecipient`, `Contact`) - Define data structure and relationships
- **Jobs** (`SendCampaignEmail`) - Handle asynchronous tasks using Laravel Queue

#### **2. Service Pattern**
`CampaignService` handles the core business logic for campaign creation and email dispatching:
- Creates campaign records with subject and body
- Associates recipients with campaigns via the pivot model `CampaignRecipient`
- Dispatches queued jobs for each recipient to enable asynchronous email sending
- Keeps controllers thin and focused on HTTP concerns

#### **3. Job Queue Pattern**
`SendCampaignEmail` implements `ShouldQueue` for:
- **Asynchronous Processing** - Emails are sent in the background without blocking user requests
- **Scalability** - Multiple queue workers can process emails concurrently
- **Status Tracking** - Each recipient's status (`pending`, `sent`, `failed`) is tracked independently
- **Error Handling** - Failed emails are caught and marked with `failed` status for debugging

#### **4. Form Request Validation**
Dedicated Request classes (`StoreCampaignRequest`) provide:
- **Centralized Validation Rules** - All validation logic in one place
- **Type Safety** - Ensures data integrity before reaching services
- **Automatic Error Handling** - Laravel returns validation errors automatically
- **Reusable Rules** - Validation can be shared across different contexts

#### **5. Inertia.js Frontend Architecture**
- **Server-Side Routing** - Laravel routes handle navigation
- **SPA Experience** - React components without API boilerplate
- **Shared State** - Data flows from controllers to React via Inertia props
- **shadcn/ui Components** - Modern, accessible UI components
- **Type-Safe Communication** - No REST API needed, props are passed directly from backend

---

## **Tech Stack**

- Backend: [Laravel](https://laravel.com/)
- Frontend: [React](https://reactjs.org/) + [InertiaJS](https://inertiajs.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Database: Sqlite, you can use any database you want 
- Queue: Database (Laravel Queue)


---

## **Installation**


### 1. Clone the repository

```bash
git clone https://github.com/mahmudul007/simple-email-campeighn-manager.git
cd simple-campaign-manager
php artisan composer:install
php artisan key:generate
php artisan migrate
php artisan db:seed 
