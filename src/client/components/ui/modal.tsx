"use client";

import * as Icons from "@/src/client/components/icons";
import * as AlertPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { Button, buttonVariants } from "@/src/client/components/ui/button";
import { cn } from "@/src/client/utils/cn";

const Modal = AlertPrimitive.Root;

const ModalTrigger = AlertPrimitive.Trigger;

const ModalPortal = ({
  className,
  ...props
}: AlertPrimitive.AlertDialogPortalProps) => (
  <AlertPrimitive.Portal className={cn(className)} {...props} />
);
ModalPortal.displayName = AlertPrimitive.Portal.displayName;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof AlertPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertPrimitive.Overlay>
>(({ className, children: _children, ...props }, ref) => (
  <AlertPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
ModalOverlay.displayName = AlertPrimitive.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof AlertPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <AlertPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        className
      )}
      {...props}
    />
  </ModalPortal>
));
ModalContent.displayName = AlertPrimitive.Content.displayName;

const ModalPrimaryHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center py-2.5 pl-6 pr-2.5", className)}
    {...props}
  />
);
ModalPrimaryHeader.displayName = "ModalPrimaryHeader";

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col border-b-[1px] border-border text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof AlertPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertPrimitive.Title
    ref={ref}
    className={cn("flex-1 text-lg font-medium", className)}
    {...props}
  />
));
ModalTitle.displayName = AlertPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof AlertPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertPrimitive.Description
    ref={ref}
    className={cn("px-6 pb-3 text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = AlertPrimitive.Description.displayName;

const ModalAction = React.forwardRef<
  React.ElementRef<typeof AlertPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
ModalAction.displayName = AlertPrimitive.Action.displayName;

const ModalClose = React.forwardRef<
  React.ElementRef<typeof AlertPrimitive.Cancel>,
  Omit<React.ComponentPropsWithoutRef<typeof AlertPrimitive.Cancel>, "asChild">
>(({ className, ...props }, ref) => (
  <AlertPrimitive.Cancel ref={ref} className={cn(className)} {...props} asChild>
    <Button variant="ghost" size="icon">
      <Icons.Clear className="h-[22px] w-[22px]" />
    </Button>
  </AlertPrimitive.Cancel>
));
ModalClose.displayName = AlertPrimitive.Cancel.displayName;

export {
  Modal,
  ModalAction,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalPrimaryHeader,
  ModalTitle,
  ModalTrigger,
};
