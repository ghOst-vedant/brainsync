import { Prisma } from "@prisma/client"

/** ================= Selects ================= **/

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    username: true,
    password: true,
    email: true,
    createdAt: true,
})

export const tagSelect = Prisma.validator<Prisma.TagSelect>()({
    id: true,
    title: true,
    createdAt: true,
})

export const linkSelect = Prisma.validator<Prisma.LinkSelect>()({
    id: true,
    hash: true,
    createdAt: true,
    userId: true,
})

export const sessionSelect = Prisma.validator<Prisma.SessionSelect>()({
    id: true,
    userId: true,
    createdAt: true,
    expiresAt: true,
})

export const workspaceSelect = Prisma.validator<Prisma.WorkspaceSelect>()({
    id: true,
    createdAt: true,
    workspaceOwner: true,
    title: true,
    iconId: true,
    data: true,
    inTrash: true,
    logo: true,
    bannerUrl: true,
})

export const collaboratorSelect = Prisma.validator<Prisma.CollaboratorSelect>()(
    {
        id: true,
        workspaceId: true,
        userId: true,
        createdAt: true,
    }
)

export const folderSelect = Prisma.validator<Prisma.FolderSelect>()({
    id: true,
    createdAt: true,
    title: true,
    iconId: true,
    data: true,
    inTrash: true,
    bannerUrl: true,
    workspaceId: true,
})

export const fileSelect = Prisma.validator<Prisma.FileSelect>()({
    id: true,
    createdAt: true,
    title: true,
    iconId: true,
    data: true,
    inTrash: true,
    bannerUrl: true,
    workspaceId: true,
    folderId: true,
})

export const fileTagSelect = Prisma.validator<Prisma.FileTagSelect>()({
    id: true,
    fileId: true,
    tagId: true,
    createdAt: true,
})

export const customerSelect = Prisma.validator<Prisma.CustomerSelect>()({
    id: true,
    stripeCustomerId: true,
})

export const productSelect = Prisma.validator<Prisma.ProductSelect>()({
    id: true,
    active: true,
    name: true,
    description: true,
    image: true,
    metadata: true,
})

export const priceSelect = Prisma.validator<Prisma.PriceSelect>()({
    id: true,
    productId: true,
    active: true,
    description: true,
    unitAmount: true,
    currency: true,
    type: true,
    interval: true,
    intervalCount: true,
    trialPeriodDays: true,
    metadata: true,
})

export const subscriptionSelect = Prisma.validator<Prisma.SubscriptionSelect>()(
    {
        id: true,
        userId: true,
        status: true,
        metadata: true,
        priceId: true,
        quantity: true,
        cancelAtPeriodEnd: true,
        created: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        endedAt: true,
        cancelAt: true,
        canceledAt: true,
        trialStart: true,
        trialEnd: true,
    }
)

/** ================= Types ================= **/

export type User = Prisma.UserGetPayload<{ select: typeof userSelect }>
export type Tag = Prisma.TagGetPayload<{ select: typeof tagSelect }>
export type Link = Prisma.LinkGetPayload<{ select: typeof linkSelect }>
export type Session = Prisma.SessionGetPayload<{ select: typeof sessionSelect }>
export type Workspace = Prisma.WorkspaceGetPayload<{
    select: typeof workspaceSelect
}>
export type Collaborator = Prisma.CollaboratorGetPayload<{
    select: typeof collaboratorSelect
}>
export type Folder = Prisma.FolderGetPayload<{ select: typeof folderSelect }>
export type File = Prisma.FileGetPayload<{ select: typeof fileSelect }>
export type FileTag = Prisma.FileTagGetPayload<{ select: typeof fileTagSelect }>
export type Customer = Prisma.CustomerGetPayload<{
    select: typeof customerSelect
}>
export type Product = Prisma.ProductGetPayload<{ select: typeof productSelect }>
export type Price = Prisma.PriceGetPayload<{ select: typeof priceSelect }>
export type Subscription = Prisma.SubscriptionGetPayload<{
    select: typeof subscriptionSelect
}>
